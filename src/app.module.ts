import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'env.validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AwsService } from './aws/aws.service';
import { LoggerMiddleware } from './commom/middleware/logger.middleware';
import configuration from './config/configuration';
import { InvoicesModule } from './invoices/invoices.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { InvoicesController } from './invoices/invoices.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    PrismaModule,
    AuthModule,
    InvoicesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(InvoicesController);
  }
}
