import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: User) {
    return this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });
  }
}
