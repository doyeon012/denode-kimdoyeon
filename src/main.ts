import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvEnum, EnvEnumType } from './enums/env.enum';
import { setUpSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const env: EnvEnumType = configService.get('env') || EnvEnum.DEV;
  if (env !== EnvEnum.PROD) {
    setUpSwagger(app);
  }

  const port = configService.get('port');
  await app.listen(port);
}

void bootstrap();
