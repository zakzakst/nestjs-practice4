import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';
import { PostsIdService } from './postsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    JPPostsRepository,
    PostsIdService,
    JPPostsIdRepository,
  ],
})
export class PostsModule {}
