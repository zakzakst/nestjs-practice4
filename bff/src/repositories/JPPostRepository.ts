import { InternalServerErrorException } from '@nestjs/common';

export class JPPostRepository {
  // TODO: 環境変数に持たせる
  private jpBaseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  async get(): Promise<JPPaths.Posts.Get.Responses.$200> {
    const response = await fetch(this.jpBaseUrl);

    if (!response.ok) {
      // exceptionにまとめてエラー管理する
      throw new InternalServerErrorException(
        `外部APIとの接続に失敗しました: ${response.status}`,
      );
    }

    return (await response.json()) as JPPaths.Posts.Get.Responses.$200;
  }

  async post(
    payload: JPPaths.Posts.Post.RequestBody,
  ): Promise<JPPaths.Posts.Post.Responses.$201> {
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

    return (await response.json()) as JPPaths.Posts.Post.Responses.$201;
  }
}
