import { Injectable } from '@nestjs/common';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';
import { BffErrors } from '../exceptions/BffErrors.js';
import * as z from 'zod';

const FIND_ALL_DEFAULT_LIMIT = 20;

const findAllSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

const createSchema = z.object({
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

const findAllGetFilteredItems = (
  items: BFFComponents.Schemas.Post[],
  total: number,
  page: number,
  limit: number,
): BFFComponents.Schemas.Post[] => {
  if (page * limit > total) {
    return [];
  }
  const filteredItems = items.filter((_, index) => {
    if (index >= page - 1 * limit && index < page * limit + 1) {
      return true;
    }
    return false;
  });
  return filteredItems;
};

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: JPPostsRepository) {}

  async findAll(request?: {
    page?: number;
    limit?: number;
  }): Promise<BFFPaths.Posts.Get.Responses.$200> {
    // リクエストデータ検証
    const requestCheckResult = findAllSchema.safeParse(request);
    if (!requestCheckResult.success) {
      throw BffErrors.BFF400_02();
    }

    const jpResponse = await this.postsRepository.get();

    const total = jpResponse.length;
    const page = request?.page ?? 1;
    const limit = request?.limit ?? FIND_ALL_DEFAULT_LIMIT;
    const filteredItems = findAllGetFilteredItems(
      jpResponse,
      total,
      page,
      limit,
    );

    return {
      total,
      limit,
      page,
      items: filteredItems,
    };
  }

  create(
    request: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
    const { userId, title, body } = request;

    const payload = {
      userId,
      title,
      body,
    };

    // 外部APIリクエストデータ検証
    const payloadCheckResult = createSchema.safeParse(payload);
    if (!payloadCheckResult.success) {
      const missingFields = (['userId', 'title', 'body'] as const).filter(
        (field) => payload[field] === undefined,
      );
      if (missingFields.length > 0) {
        throw BffErrors.BFF400_01();
      }
      throw BffErrors.BFF400_02();
    }

    return this.postsRepository.post(payload);
  }
}
