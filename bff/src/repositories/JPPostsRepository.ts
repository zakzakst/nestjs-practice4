import { Injectable } from '@nestjs/common';
import { JPErrors } from '../exceptions/JPErrors.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JPPostsRepository {
  private readonly jpBaseUrl: string;

  constructor(configService: ConfigService) {
    this.jpBaseUrl = configService.getOrThrow<string>('JP_BASE_URL');
  }

  async get(): Promise<JPPaths.Posts.Get.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/posts`);
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (!response.ok) {
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Posts.Get.Responses.$200;
  }

  async post(
    payload: JPPaths.Posts.Post.RequestBody,
  ): Promise<JPPaths.Posts.Post.Responses.$201> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/posts`, {
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
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Posts.Post.Responses.$201;
  }
}
