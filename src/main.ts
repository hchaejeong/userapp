import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe( {
    whitelist: true,
    forbidNonWhitelisted: true, //들어오면 안되면 정보 아예 차단
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
