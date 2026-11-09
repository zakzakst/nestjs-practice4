import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import type { EPost } from './post.entity.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): EPost[] {
    return this.postsService.findAll();
  }

  @Post()
  create(
    @Body() request: { userId: number; title: string; body: string },
  ): EPost {
    return this.postsService.create(request);
  }
}
