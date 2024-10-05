import { Controller, Get, Param, Query } from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('search')
  async searchUsers(@Query('q') query: string): Promise<User[]> {
    return this.usersService.searchUsers(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findById(id);
  }
}