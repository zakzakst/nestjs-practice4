import { Module } from '@nestjs/common';
import { PostDetailsController } from './post-details.controller.js';
import { PostDetailsIdService } from './post-detailsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

@Module({
  controllers: [PostDetailsController],
  providers: [PostDetailsIdService, JPPostsIdRepository, JPUsersIdRepository],
})
export class PostDetailsModule {}
