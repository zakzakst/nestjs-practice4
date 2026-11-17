import { Injectable } from '@nestjs/common';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';
import { PostDetailConverter } from '../converters/PostDetailConverter.js';

@Injectable()
export class PostDetailsIdService {
  constructor(
    private readonly postsIdRepository: JPPostsIdRepository,
    private readonly usersIdRepository: JPUsersIdRepository,
  ) {}

  async find(
    id: BFFPaths.PostDetails$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.PostDetails$Id.Get.Responses.$200> {
    const post = await this.postsIdRepository.get(id);
    const user = await this.usersIdRepository.get(post.userId);
    return PostDetailConverter(post, user);
  }
}
