import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class PostsService {
  async findAll(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new InternalServerErrorException(
        `外部APIとの接続に失敗しました: ${response.status}`,
      );
    }

    return (await response.json()) as BFFPaths.Posts.Get.Responses.$200;
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

    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      throw new InternalServerErrorException(
        `外部APIとの接続に失敗しました: ${response.status}`,
      );
    }

    return (await response.json()) as BFFPaths.Posts.Post.Responses.$201;
  }
}
