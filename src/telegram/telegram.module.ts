import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [TelegramService],
})
export class TelegramModule {}