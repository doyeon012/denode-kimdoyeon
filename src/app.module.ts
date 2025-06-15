import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBConfig } from './config/db.config';
import { DomainModule } from './domain/domain.module';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DBConfig,
    }),
    JwtModule.register({
      global: true,
    }),
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
