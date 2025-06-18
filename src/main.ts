import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvEnum, EnvEnumType } from './enums/env.enum';
import { setUpSwagger } from './config/swagger.config';
import AuthGuard from './middleware/auth/auth.guard';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  if (!global.transactionalContextInitialized) {
    initializeTransactionalContext();
    global.transactionalContextInitialized = true;
  }

  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const env: EnvEnumType = configService.get('env') || EnvEnum.DEV;
  if (env !== EnvEnum.PROD) {
    setUpSwagger(app);
  }

  app.useGlobalGuards(app.get(AuthGuard));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )
  const port = configService.get('port');
  await app.listen(port);
}

void bootstrap();
