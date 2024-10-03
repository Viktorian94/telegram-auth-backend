import { Controller, Get, Query } from '@nestjs/common';
import { User } from './user.entity';
import { ILike } from 'typeorm';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: any): Promise<User[]> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? [
          { username: ILike(`%${search}%`) },
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
        ]
      : {};

    return this.usersService.findAll({
      where,
      skip,
      take: limit,
    });
  }
}
