import { Injectable } from '@nestjs/common';
import { JPErrors } from '../exceptions/JPErrors.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JPPostsIdRepository {
  private readonly jpBaseUrl: string;

  constructor(configService: ConfigService) {
    this.jpBaseUrl = configService.getOrThrow<string>('JP_BASE_URL');
  }

  async get(
    id: JPPaths.Posts$Id.Get.Parameters.Id,
  ): Promise<JPPaths.Posts$Id.Get.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/posts/${id}`);
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (response.status === 404) {
      throw JPErrors.JP404_01(response);
    }

    if (!response.ok) {
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Posts$Id.Get.Responses.$200;
  }

  async put(
    id: JPPaths.Posts$Id.Put.Parameters.Id,
    payload: JPPaths.Posts$Id.Put.RequestBody,
  ): Promise<JPPaths.Posts$Id.Put.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (response.status === 404) {
      throw JPErrors.JP404_01(response);
    }

    if (!response.ok) {
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Posts$Id.Put.Responses.$200;
  }

  async delete(
    id: JPPaths.Posts$Id.Delete.Parameters.Id,
  ): Promise<JPPaths.Posts$Id.Delete.Responses.$204> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/posts/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (response.status === 404) {
      throw JPErrors.JP404_01(response);
    }

    if (!response.ok) {
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Posts$Id.Delete.Responses.$204;
  }
}
