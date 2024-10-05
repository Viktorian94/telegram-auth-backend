import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
