import { Injectable } from '@nestjs/common';
import { JPErrors } from '../exceptions/JPErrors.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JPUsersIdRepository {
  private readonly jpBaseUrl: string;

  constructor(configService: ConfigService) {
    this.jpBaseUrl = configService.getOrThrow<string>('JP_BASE_URL');
  }

  async get(
    id: JPPaths.Users$Id.Get.Parameters.Id,
  ): Promise<JPPaths.Users$Id.Get.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/users/${id}`);
    } catch (e) {
      throw JPErrors.JP500_01(e);
    }

    if (response.status === 404) {
      throw JPErrors.JP404_01(response);
    }

    if (!response.ok) {
      throw JPErrors.JP502_01(response);
    }

    return (await response.json()) as JPPaths.Users$Id.Get.Responses.$200;
  }

  async put(
    id: JPPaths.Users$Id.Put.Parameters.Id,
    payload: JPPaths.Users$Id.Put.RequestBody,
  ): Promise<JPPaths.Users$Id.Put.Responses.$200> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/users/${id}`, {
        method: 'PUT',
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

    return (await response.json()) as JPPaths.Users$Id.Put.Responses.$200;
  }

  async delete(
    id: JPPaths.Users$Id.Delete.Parameters.Id,
  ): Promise<JPPaths.Users$Id.Delete.Responses.$204> {
    let response: Response;

    try {
      response = await fetch(`${this.jpBaseUrl}/users/${id}`, {
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

    return (await response.json()) as JPPaths.Users$Id.Delete.Responses.$204;
  }
}
