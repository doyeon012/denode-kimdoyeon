import { Module } from '@nestjs/common';
import { UsersModule } from '@domain/user/users.module';
import { ProductModule } from '@domain/product/product.module';
import { AuthModule } from '@domain/auth/auth.module';

@Module({
  imports: [UsersModule, ProductModule, AuthModule],
})
export class DomainModule {}
