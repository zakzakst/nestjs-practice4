import { InternalServerErrorException } from '@nestjs/common';

// TODO: 型をBFFPathsではなくJPPathsを利用するようにする

export class JPPostRepository {
  // TODO: 環境変数に持たせる
  private jpBaseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  async get(): Promise<BFFPaths.Posts.Get.Responses.$200> {
    const response = await fetch(this.jpBaseUrl);

    if (!response.ok) {
      // exceptionにまとめてエラー管理する
      throw new InternalServerErrorException(
        `外部APIとの接続に失敗しました: ${response.status}`,
      );
    }

    return (await response.json()) as BFFPaths.Posts.Get.Responses.$200;
  }

  async post(
    payload: BFFPaths.Posts.Post.RequestBody,
  ): Promise<BFFPaths.Posts.Post.Responses.$201> {
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
