import { Injectable } from '@nestjs/common';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: JPPostsRepository) {}

  async findAll(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    return await this.postsRepository.get();
  }

  async create(
    request: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    const { userId, title, body } = request;

    const payload = {
      userId,
      title,
      body,
    };

    return await this.postsRepository.post(payload);
  }
}
