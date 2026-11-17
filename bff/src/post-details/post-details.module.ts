import { Module } from '@nestjs/common';
import { PostDetailsController } from './post-details.controller.js';
import { PostDetailsService } from './post-details.service.js';

@Module({
  controllers: [PostDetailsController],
  providers: [PostDetailsService]
})
export class PostDetailsModule {}
