import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): BFFPaths.Posts.Get.Responses.$200 {
    return this.postsService.findAll();
  }

  @Post()
  create(
    @Body() request: BFFPaths.Posts.Post.RequestBody,
  ): BFFPaths.Posts.Post.Responses.$201 {
    return this.postsService.create(request);
  }
}
