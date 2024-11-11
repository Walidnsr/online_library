import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'; // Corrected import

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'defaultSecret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Secure should be true in production (HTTPS)
    }),
  );

  await app.listen(process.env.PORT || 3001);

  console.log(`🚀 API listening on PORT ${process.env.PORT || 3001}`);
}

bootstrap();
