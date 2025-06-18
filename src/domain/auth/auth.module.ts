import { Module } from '@nestjs/common';
import { AuthController } from '@domain/auth/controller/auth.controller';
import { AuthService } from '@domain/auth/service/auth.service';
import { UsersModule } from '@domain/user/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
