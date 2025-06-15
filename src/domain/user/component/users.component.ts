import { Injectable } from '@nestjs/common';
import { UsersDao } from '../dao/users.dao';
import { CreateUserDto } from '../dto/create.user.dto';
import { Users } from '../entity/users.entity';

@Injectable()
export class UsersComponent {
  constructor(private userDao: UsersDao) {}

  public async create(createUserDto: CreateUserDto): Promise<void> {
    return this.userDao.create(createUserDto);
  }

  public async findByLoginId(loginId: string): Promise<Users | null> {
    return this.userDao.findByLoginId(loginId);
  }
}
