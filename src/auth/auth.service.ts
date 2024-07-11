import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  async oAuthLogin(req) {
    const authUser = req.user;

    if (!authUser) {
      throw new NotFoundException(`No user found`);
    }

    let accessTokenPayload: string;

    const user = await this.usersService.getByEmail(authUser.email);

    if (user) {
      accessTokenPayload = user.id.toString();
    } else {
      const newUser = await this.usersService.create(authUser);
      accessTokenPayload = newUser.id.toString();
    }
    const payload = { id: accessTokenPayload };
    const jwt = await this.jwtService.signAsync(payload);
    return { jwt };
  }
}
