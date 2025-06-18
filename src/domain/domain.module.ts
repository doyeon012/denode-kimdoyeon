import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProductModule, AuthModule],
})
export class DomainModule {}
