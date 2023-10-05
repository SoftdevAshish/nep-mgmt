import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from '@nestjs/swagger';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none', persistAuthorization: true },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: process.env.API_TITLE,
  };

  // swagger documentation config
  const options = new DocumentBuilder()
      .setTitle(process.env.API_TITLE)
      .setDescription(process.env.API_DESCRIPTION)
      .setVersion(process.env.API_VERSION)
      .setBasePath(process.env.API_PREFIX)
      .addBearerAuth()
      .addServer(`${process.env.HOST}:${process.env.PORT}`)
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document, customOptions);

  app.use(helmet());
  await app.listen(process.env.PORT);
}
bootstrap();
