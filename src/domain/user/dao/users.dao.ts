import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@domain/user/dto/create.user.dto';
import { Users } from '@domain/user/entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersDao {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);
  }

  async findByLoginId(loginId: string): Promise<Users | null> {
    return this.usersRepository.findOneBy({ loginId: loginId });
  }
}
