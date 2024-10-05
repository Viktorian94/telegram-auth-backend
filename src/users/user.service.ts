import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findByTelegramId(telegramId: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { telegramId } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.usersRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
        { username: Like(`%${query}%`) },
      ],
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }


  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
