import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOAuthStrategy } from './guards/google-oauth.strategy';

import * as dotenv from 'dotenv';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtGuardStrategy } from './guards/jwt-auth.strategy';
dotenv.config();

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    UsersService,
    JwtGuard,
    JwtGuardStrategy,
    GoogleOAuthStrategy,
  ],
})
export class AuthModule {}
