import { Injectable } from '@nestjs/common';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';
import { BffErrors } from '../exceptions/BffErrors.js';
import * as z from 'zod';

const updateSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

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
    const requestCheckResult = updateSchema.safeParse(request);
    if (!requestCheckResult.success) {
      throw BffErrors.BFF400_02();
    }

    return this.usersIdRepository.put(id, request);
  }

  async remove(
    id: BFFPaths.Users$Id.Delete.Parameters.Id,
  ): Promise<BFFPaths.Users$Id.Delete.Responses.$204> {
    return this.usersIdRepository.delete(id);
  }
}
