import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'www'),
      exclude: ['/api/(.*)'],
    }),
    CommonModule,
    AuthModule,
    UserModule,
    PostModule,
    CategoryModule,
    CommentModule,
  ],
  exports: [CommonModule],
})
export class AppModule {}
