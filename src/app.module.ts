import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBConfig } from './config/db.config';
import { DomainModule } from './domain/domain.module';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import AuthGuard from './middleware/auth/auth.guard';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

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
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed')
        }

        return addTransactionalDataSource(new DataSource(options))
      },
    }),
    JwtModule.register({
      global: true,
    }),
    DomainModule,
  ],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
