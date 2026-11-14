import { Injectable } from '@nestjs/common';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: JPPostsRepository) {}

  async findAll(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    // TODO: エラーハンドリング
    // - request情報不足
    // - 外部API通信失敗
    return await this.postsRepository.get();
  }

  async create(
    request: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    // TODO: エラーハンドリング
    // - request情報不足
    // - 外部API通信失敗
    const { userId, title, body } = request;

    const payload = {
      userId,
      title,
      body,
    };

    return await this.postsRepository.post(payload);
  }
}
