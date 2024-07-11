import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { AwsService } from '../aws/aws.service';
import { InvoiceStatus } from '../commom/constants/invoice';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { InvoiceDetail, InvoiceSummary } from './dto/invoice-detail';
import {
  ExpenseAnalysisStandardFields,
  InvoiceExtractRaw,
} from './interfaces.ts/invoice-extract-raw';

@Injectable()
export class InvoicesService {
  constructor(
    private awsService: AwsService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async getInvoice(
    invoice: Prisma.InvoiceWhereUniqueInput,
  ): Promise<InvoiceDetail | null> {
    const entity = await this.prisma.invoice.findUnique({ where: invoice });
    if (!entity) {
      throw new MethodNotAllowedException();
    }

    let summary = [];
    if (entity.extract_raw?.toString()) {
      const invoiceExtractRaw = JSON.parse(entity.extract_raw?.toString());
      summary = this.getSummaryFromRaw(invoiceExtractRaw);
    }
    const invoiceDetail: InvoiceDetail = {
      id: entity.id,
      file_name: entity.file_name,
      status: entity.status,
      created_at: entity.created_at,
      summary: summary,
    };
    return invoiceDetail;
  }

  async getInvoices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async uploadInvoice(iduser: number, file: Express.Multer.File) {
    const user = await this.usersService.getById(iduser);
    const { key, file_name } = await this.awsService.uploadImage(file);
    const data: Prisma.InvoiceCreateInput = {
      image_url: key,
      status: InvoiceStatus.PROCESSING,
      file_name: file_name,
      user: { connect: user },
    };
    const invoice = await this.prisma.invoice.create({
      data,
    });
    this.awsService.processImage(key).then(async (response) => {
      const extract_raw = JSON.stringify({ expensesFieldList: response });
      await this.prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          extract_raw: extract_raw,
          status: InvoiceStatus.FINISHED,
        },
      });
    });
    return invoice;
  }

  private getSummaryFromRaw(raw: InvoiceExtractRaw): InvoiceSummary[] {
    const summary = [];
    raw?.expensesFieldList.forEach((expenseFieldList) => {
      expenseFieldList.forEach((e) => {
        if (!ExpenseAnalysisStandardFields[e.Type?.Text]) return;
        const invoiceSummary: InvoiceSummary = {
          label: ExpenseAnalysisStandardFields[e.Type?.Text],
          value: e.ValueDetection?.Text,
        };
        summary.push(invoiceSummary);
      });
    });
    return summary;
  }
}
