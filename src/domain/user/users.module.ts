import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@domain/user/entity/users.entity';
import { UsersComponent } from '@domain/user/component/users.component';
import { UsersDao } from '@domain/user/dao/users.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersComponent, UsersDao],
  exports: [UsersComponent],
})
export class UsersModule {}
