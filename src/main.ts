import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // middleware validation field trong body of request

  // define  thông tin cơ bản của swagger
  const config = new DocumentBuilder()
  .setTitle("Capstone NODE38")
  .addBearerAuth()
  .setDescription("Đây là list API về Youtube")
  .setVersion("1.0")
  .build()

  // apply swagger cho NestJS
  const swagger = SwaggerModule.createDocument(app, config);

  // setup swagger với đường dẫn là /swagger
  SwaggerModule.setup("swagger", app, swagger);

  // app.use(loggerMiddleware);
  await app.listen(3001);
}
bootstrap();

// npm i @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt
