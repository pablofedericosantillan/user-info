// import { JwtAuthGuard } from 'src/features/auth/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Proyecto Test')
    .setDescription('Proyecto Test admin tool')
    .setVersion('1.0')
    .addSecurity('Authorization', {
      type: 'http',
      name: 'Authorization',
      scheme: 'Bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = +(process.env.PORT ?? 3000);
  await app.listen(port);
}
bootstrap();
