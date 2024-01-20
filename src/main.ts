import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as hpp from 'hpp';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const origin = process.env.ORIGIN ?? 'http://localhost:3000';
  const port = process.env.PORT ?? 3000;
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors({
    credentials: true,
    origin: [origin],
  });
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(hpp());
  app.use(json());
  app.use(compression());
  app.use(urlencoded({ extended: false }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(port, async () => {
    new Logger('NestApplication').log(
      `Application is running on: ${await app.getUrl()}`,
    );
  });
}
bootstrap();
