import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoiceStatus } from '../commom/constants/invoice';

describe('InvoicesController', () => {
  let controller: InvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
        {
          provide: InvoicesService,
          useValue: {
            getInvoice: jest.fn().mockImplementation(({}, id: number) => {
              return Promise.resolve({
                id: 1,
                status: InvoiceStatus.PROCESSING,
                image_url: 'image-key',
                file_name: 'file-name',
              });
            }),
            getInvoices: jest.fn().mockResolvedValue([
              {
                id: 1,
                status: InvoiceStatus.PROCESSING,
                image_url: 'image-key',
                file_name: 'file-name',
              },
            ]),
            uploadInvoice: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getInvoice by id', () => {
    it('should fetch an invoice by id', async () => {
      const invoice = await controller.getInvoice({}, 1);

      expect(invoice.id).toBe(1);
    });
  });

  describe('getInvoices', () => {
    it('should fetch all invoices', async () => {
      const invoices = await controller.getInvoices({});

      expect(invoices).toEqual([
        {
          id: 1,
          status: InvoiceStatus.PROCESSING,
          image_url: 'image-key',
          file_name: 'file-name',
        },
      ]);
    });
  });
});
