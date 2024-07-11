import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { AwsService } from '../aws/aws.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [InvoicesService, AwsService, PrismaService, UsersService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
