import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') as string;
    this.bot = new Telegraf(botToken);
  }

  async onModuleInit() {
    this.bot.start(async (ctx) => {
      const profileData = ctx.from;
      const user = await this.authService.validateOrCreateUser(profileData);
      await ctx.reply(`Добро пожаловать, ${user.firstName}!`);
    });

    await this.bot.launch();
    console.log('Telegram bot started');
  }
}