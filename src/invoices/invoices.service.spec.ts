import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AwsService } from '../aws/aws.service';
import { InvoiceStatus } from '../commom/constants/invoice';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { InvoicesService } from './invoices.service';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let prisma: PrismaService;

  const invoiceUnique = {
    id: 1,
    status: InvoiceStatus.FINISHED,
    image_url: 'image-key',
    file_name: 'file-name',
    created_at: '2024-07-11T02:14:00.179Z',
    extract_raw: null,
  };

  const invoiceDetail = {
    id: 1,
    status: InvoiceStatus.FINISHED,
    file_name: 'file-name',
    created_at: '2024-07-11T02:14:00.179Z',
    summary: [],
  };

  const invoicesMany = [
    {
      id: 1,
      status: InvoiceStatus.FINISHED,
      image_url: 'image-key',
      file_name: 'file-name',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsService,
        InvoicesService,
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            invoice: {
              findUnique: jest.fn().mockReturnValue(invoiceUnique),
              findMany: jest.fn().mockReturnValue(invoicesMany),
              create: jest.fn().mockReturnValue(invoiceDetail),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a invoice detail', async () => {
    const unique: Prisma.InvoiceWhereUniqueInput = { id: 1 };

    const invoice = await service.getInvoice(unique);
    const prismaSpy = jest.spyOn(prisma.invoice, 'findUnique');

    expect(invoice).toEqual(invoiceDetail);
    expect(prismaSpy).toHaveBeenCalledWith({ where: unique });
  });

  it('should return a list of invoices', async () => {
    const params = {
      skip: 0,
      take: 10,
      cursor: null,
      where: null,
      orderBy: null,
    };

    const invoices = await service.getInvoices(params);
    const prismaSpy = jest
      .spyOn(prisma.invoice, 'findMany')
      .mockResolvedValue(undefined);

    expect(invoices).toEqual(invoicesMany);
    expect(prismaSpy).toHaveBeenCalledWith(params);
  });
});
