import { Strategy } from 'passport-telegram-official';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor(private authService: AuthService) {
    super({
      botToken: process.env.TELEGRAM_BOT_TOKEN,
    });
  }

  async validate(profile: any): Promise<any> {
    const user = await this.authService.validateOrCreateUser(profile);
    return user;
  }
}
