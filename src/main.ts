import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // app.enableCors({
  //   allowedHeaders: "*",
  //   origin: "*",
  //   credentials: true,
  // });

  const port = +(process.env.PORT ?? 3000);
  await app.listen(port);
}
bootstrap();
