import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  appPort,
  swaggerDescription,
  swaggerDocs,
  swaggerTitle,
  swaggerVersion,
} from '../config/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    .setVersion(swaggerVersion)
    .addTag(swaggerDocs)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(appPort);
}

bootstrap();
