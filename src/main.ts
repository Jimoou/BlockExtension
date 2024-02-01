import http from 'http';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
dotenv.config();
import { AppModule } from './app.module';

async function bootstrap() {
  const server = express();
  const adapter = new ExpressAdapter(server);
  const app = await NestFactory.create(AppModule, adapter, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
    logger: ['log', 'error', 'warn', 'debug'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.init();

  const port = process.env.PORT;
  http.createServer(server).listen(port);
  console.info('server is running on ', port);
}

bootstrap();
