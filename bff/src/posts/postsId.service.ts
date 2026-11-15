import { Injectable } from '@nestjs/common';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';
import { BffErrors } from '../exceptions/BffErrors.js';
import * as z from 'zod';

const updateSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

@Injectable()
export class PostsIdService {
  constructor(private readonly postsIdRepository: JPPostsIdRepository) {}

  async find(
    id: BFFPaths.Posts$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.Posts$Id.Get.Responses.$200> {
    return this.postsIdRepository.get(id);
  }

  async update(
    id: BFFPaths.Posts$Id.Put.Parameters.Id,
    request: BFFPaths.Posts$Id.Put.RequestBody,
  ): Promise<BFFPaths.Posts$Id.Put.Responses.$200> {
    const { userId, title, body } = request;

    const payload = {
      id,
      userId,
      title,
      body,
    };

    // 外部APIリクエストデータ検証
    const payloadCheckResult = updateSchema.safeParse(payload);
    if (!payloadCheckResult.success) {
      const missingFields = (['id', 'userId', 'title', 'body'] as const).filter(
        (field) => payload[field] === undefined,
      );
      if (missingFields.length > 0) {
        throw BffErrors.BFF400_01();
      }
      throw BffErrors.BFF400_02();
    }

    return this.postsIdRepository.put(id, request);
  }

  async remove(
    id: BFFPaths.Posts$Id.Delete.Parameters.Id,
  ): Promise<BFFPaths.Posts$Id.Delete.Responses.$204> {
    return this.postsIdRepository.delete(id);
  }
}
