import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import helmet from 'node_modules/helmet/index.mjs';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // In production: load from .env (e.g. ALLOWED_ORIGINS=https://app.yourdomain.com,https://dashboard.yourdomain.com)
  const allowedOrigins =
    configService.get<string>('ALLOWED_ORIGINS')?.split(',')?.filter(Boolean) ??
    [];

  app.use(helmet());
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'], // custom headers goes here
    credentials: false,
    maxAge: 86400,
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}
void bootstrap();
