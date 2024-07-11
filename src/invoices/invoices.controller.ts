import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Invoice } from '@prisma/client';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { InvoiceDetail } from './dto/invoice-detail';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
@ApiTags('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  getInvoice(
    @Req() req,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<InvoiceDetail> {
    const user = req.user;
    const invoice = this.invoicesService.getInvoice({
      id,
      userId: Number(user?.id),
    });
    return invoice;
  }

  @Get()
  @UseGuards(JwtGuard)
  getInvoices(
    @Req() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Invoice[]> {
    const user = req.user;
    limit = limit > 100 ? 100 : limit;
    const params = {
      skip: (page - 1) * limit,
      take: limit,
      where: {
        userId: Number(user.id),
      },
    };
    return this.invoicesService.getInvoices(params);
  }

  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadInvoice(
    @Req() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1 * 1024 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    const user = req.user;
    return this.invoicesService.uploadInvoice(Number(user.id), file);
  }
}
