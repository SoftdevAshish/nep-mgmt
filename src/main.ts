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
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setViewEngine('hbs');
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
