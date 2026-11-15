import { Injectable } from '@nestjs/common';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';
import { BffErrors } from '../exceptions/BffErrors.js';
import * as z from 'zod';

@Injectable()
export class UsersIdService {
  constructor(private readonly usersIdRepository: JPUsersIdRepository) {}

  async find(
    id: BFFPaths.Users$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.Users$Id.Get.Responses.$200> {
    return this.usersIdRepository.get(id);
  }

  async update(
    id: BFFPaths.Users$Id.Put.Parameters.Id,
    request: BFFPaths.Users$Id.Put.RequestBody,
  ): Promise<BFFPaths.Users$Id.Put.Responses.$200> {
    // const { userId, title, body } = request;

    // const payload = {
    //   id,
    //   userId,
    //   title,
    //   body,
    // };

    // // 外部APIリクエストデータ検証
    // const payloadCheckResult = updateSchema.safeParse(payload);
    // if (!payloadCheckResult.success) {
    //   const missingFields = (['id', 'userId', 'title', 'body'] as const).filter(
    //     (field) => payload[field] === undefined,
    //   );
    //   if (missingFields.length > 0) {
    //     throw BffErrors.BFF400_01();
    //   }
    //   throw BffErrors.BFF400_02();
    // }

    return this.usersIdRepository.put(id, request);
  }

  async remove(
    id: BFFPaths.Users$Id.Delete.Parameters.Id,
  ): Promise<BFFPaths.Users$Id.Delete.Responses.$204> {
    return this.usersIdRepository.delete(id);
  }
}
