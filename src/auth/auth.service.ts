import { Injectable } from '@nestjs/common';

import { User } from '../users/user.entity';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateOrCreateUser(profileData: any): Promise<User> {
    let user = await this.usersService.findByTelegramId(profileData.id);

    if (!user) {
      user = await this.usersService.create({
        telegramId: profileData.id,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        username: profileData.username,
        phoneNumber: profileData.phone_number,
        languageCode: profileData.language_code,
        photoUrl: profileData.photo_url,
      });
    }

    return user;
  }
}
