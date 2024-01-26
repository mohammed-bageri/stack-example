import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { HashingService } from './services/hashing.service';
import { HttpLoggerInterceptor } from './interceptors/http-logger.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { ErrorFilter } from './filters/error.filter';
import { MailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import appConfig from './configs/app.config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { customDestination, customFileName } from './utils/file-upload.util';
import { join } from 'path';

const providers = [PrismaService, HashingService, MailService];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      },
    ]),
    ConfigModule.forFeature(appConfig),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          service: `${configService.get('app').nodemailerService}`,
          auth: {
            user: configService.get('app').nodemailerEmail,
            pass: configService.get('app').nodemailerPassword,
          },
        },
        defaults: {
          from: `"${configService.get('app').appName}" <${configService.get('app').nodemailerEmail}>`,
        },
        template: {
          dir: join(__dirname, '../../public', 'emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          storage: diskStorage({
            destination: customDestination,
            filename: customFileName,
          }),
          limits: {
            fileSize: 4000000,
            files: 10,
          },
        };
      },
    }),
    CacheModule.registerAsync({
      useFactory: () => {
        return {
          isGlobal: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    ...providers,
  ],
  exports: providers,
})
export class CommonModule {}
