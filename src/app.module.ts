import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'www'),
      exclude: ['/api/(.*)'],
    }),
    CommonModule,
  ],
})
export class AppModule {}
