import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const userUnique = { id: 1, email: 'douglas.shiro@gmail.com' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockImplementation(() => {
                return Promise.resolve(userUnique);
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch a user by id', async () => {
    const user = await service.getById(1);
    const prismaSpy = jest.spyOn(prisma.user, 'findUnique');

    expect(user).toEqual(userUnique);
    expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
