import { JPErrors } from '../exceptions/JPErrors.js';

export class JPPostsRepository {
  // TODO: 環境変数に持たせる
  private jpBaseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  async get(): Promise<JPPaths.Posts.Get.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(this.jpBaseUrl);
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (!response.ok) {
      throw JPErrors.JP500_01(response);
    }

    return (await response.json()) as JPPaths.Posts.Get.Responses.$200;
  }

  async post(
    payload: JPPaths.Posts.Post.RequestBody,
  ): Promise<JPPaths.Posts.Post.Responses.$201> {
    let response: Response;

    try {
      response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (!response.ok) {
      throw JPErrors.JP500_01(response);
    }

    return (await response.json()) as JPPaths.Posts.Post.Responses.$201;
  }
}
