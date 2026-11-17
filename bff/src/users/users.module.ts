import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersIdService } from './usersId.service.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

@Module({
  controllers: [UsersController],
  providers: [UsersIdService, JPUsersIdRepository],
})
export class UsersModule {}
