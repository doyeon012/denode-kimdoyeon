import { Injectable } from '@nestjs/common';
import { UsersDao } from '@domain/user/dao/users.dao';
import { CreateUserDto } from '@domain/user/dto/create.user.dto';
import { Users } from '@domain/user/entity/users.entity';

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
