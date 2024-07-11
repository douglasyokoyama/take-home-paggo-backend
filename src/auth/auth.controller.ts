import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const token = await this.authService.oAuthLogin(req);
      res.redirect(
        `${this.configService.get<string>('frontendurl')}/oauth?token=${token.jwt}`,
      );
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }
}
