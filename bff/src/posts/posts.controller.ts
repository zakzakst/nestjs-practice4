import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsIdService } from './postsId.service.js';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsIdService: PostsIdService,
  ) {}

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
    @Body() body: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    return this.postsService.create(body);
  }

  @Get(':id')
  find(
    @Param('id', ParseIntPipe) id: BFFPaths.Posts$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.Posts$Id.Get.Responses.$200> {
    return this.postsIdService.find(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: BFFPaths.Posts$Id.Put.Parameters.Id,
    @Body() body: BFFPaths.Posts$Id.Put.RequestBody,
  ): Promise<BFFPaths.Posts$Id.Put.Responses.$200> {
    return this.postsIdService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: BFFPaths.Posts$Id.Delete.Parameters.Id,
  ): Promise<BFFPaths.Posts$Id.Delete.Responses.$204> {
    return this.postsIdService.remove(id);
  }
}
