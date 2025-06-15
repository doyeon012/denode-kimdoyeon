import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create.user.dto';
import { Users } from '../entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersDao {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = new Users();
    user.loginId = createUserDto.loginId;
    user.password = createUserDto.password;
    user.name = createUserDto.name;
    user.nickname = createUserDto.nickname;
    user.age = createUserDto.age;

    await this.usersRepository.save(user);
  }

  async findByLoginId(loginId: string): Promise<Users | null> {
    return this.usersRepository.findOneBy({ loginId: loginId });
  }
}
