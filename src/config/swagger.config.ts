import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import * as path from 'path';
import AuthGuard from 'src/middleware/auth/auth.guard';

export function setUpSwagger(app: INestApplication) {
  const configService: ConfigService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('denode-kimdoyeon API')
    .setDescription('denode-kimdoyeon API documentation')
    .setVersion(configService.get('version')!)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your access token',
      },
      AuthGuard.ACCESS_TOKEN_HEADER,
    )
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  const specJsonPath = path.join(configService.get('PWD') || process.cwd(), './swagger-spec.json');
  writeFileSync(specJsonPath, JSON.stringify(documentFactory));
}
