import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PostsService } from './posts.service.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(
    @Query() query?: BFFPaths.Posts.Get.QueryParameters,
  ): Promise<BFFPaths.Posts.Get.Responses.$200> {
    if (!query) return this.postsService.findAll();
    const { page, limit } = query;
    return this.postsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Post()
  create(
    @Body() request: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    return this.postsService.create(request);
  }
}
