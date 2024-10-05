import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('telegram/callback')
  async telegramCallback(@Query() query: any, @Res() res: Response) {
    if (!this.checkTelegramAuth(query)) {
      return res.status(403).send('Unauthorized');
    }

    const user = await this.authService.validateOrCreateUser(query);

    res.redirect(`http://your-frontend-url.com/profile?userId=${user.id}`);
  }

  private checkTelegramAuth(data: any): boolean {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') as string;
    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const dataCheckString = Object.keys(data)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join('\n');

    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    return hmac === data.hash;
  }
}