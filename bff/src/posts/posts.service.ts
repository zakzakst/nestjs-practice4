import { Injectable } from '@nestjs/common';
import { JPPostRepository } from '../repositories/JPPostRepository.js';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: JPPostRepository) {}

  async findAll(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    return await this.postRepository.get();
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

    return await this.postRepository.post(payload);
  }
}
