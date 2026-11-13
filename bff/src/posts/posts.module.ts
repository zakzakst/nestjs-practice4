import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';

@Module({
  controllers: [PostsController],
  providers: [PostsService, JPPostsRepository],
})
export class PostsModule {}
