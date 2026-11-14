import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostsModule],
})
export class AppModule {}
