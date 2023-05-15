import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LISTEN_PORT } from './config/app/app.config';
import { initRedis } from './config/redis/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder().setTitle('ProjectVKR API').setDescription('Swagger docs for ProjectVKR API').setVersion('0.1').build();
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  await initRedis();
  SwaggerModule.setup('swagger/docs', app, document);
  await app.listen(LISTEN_PORT);
}
bootstrap();
