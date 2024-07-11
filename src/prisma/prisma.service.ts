import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // constructor() {
  //   super({
  //     datasources: {
  //       db: {
  //         url: 'postgresql://postgres:1234@localhost:5434/postgres?schema=public',
  //       },
  //     },
  //   });
  // }
  onModuleInit() {
    this.$connect();
  }
}
