import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import TelegramStrategy from 'passport-telegram-official';

@Module({
  imports: [PassportModule, UsersModule], 
  controllers: [AuthController],
  providers: [TelegramStrategy, AuthService],
})
export class AuthModule {}
