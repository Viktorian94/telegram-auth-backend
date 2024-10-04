import { Strategy } from 'passport-telegram-official';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor(private authService: AuthService, private configService: ConfigService,) {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if(!botToken) {
        throw new Error("TELEGA BOT TOKEN IS NOT DEFINED ")
    }
    super({
      botToken: botToken,
    });
    console.log('ConfigService:', this.configService);
    console.log('Bot Token:', botToken);
  }

  async validate(profile: any): Promise<any> {
    const user = await this.authService.validateOrCreateUser(profile);
    return user;
  }
}
