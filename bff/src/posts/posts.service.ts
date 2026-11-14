import { Injectable } from '@nestjs/common';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';
import { BffErrors } from '../exceptions/BffErrors.js';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: JPPostsRepository) {}

  async findAll(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    // TODO: エラーハンドリング
    // - request形式不正
    return await this.postsRepository.get();
  }

  create(
    request: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    // TODO: エラーハンドリング
    // - request必須項目不足
    // - request形式不正
    const { userId, title, body } = request;

    const payload = {
      userId,
      title,
      body,
    };

    return this.postsRepository.post(payload);
  }
}
