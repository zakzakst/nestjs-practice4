import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module.js';
import { UsersModule } from './users/users.module.js';
import { PostDetailsModule } from './post-details/post-details.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostsModule, UsersModule, PostDetailsModule],
})
export class AppModule {}
