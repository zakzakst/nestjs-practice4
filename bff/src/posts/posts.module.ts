import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostRepository } from '../repositories/JPPostRepository.js';

@Module({
  controllers: [PostsController],
  providers: [PostsService, JPPostRepository],
})
export class PostsModule {}
