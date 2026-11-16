import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
// import { UsersService } from './users.service.js';
import { UsersIdService } from './usersId.service.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

@Module({
  controllers: [UsersController],
  providers: [
    // UsersService,
    UsersIdService,
    JPUsersIdRepository,
  ],
})
export class UsersModule {}
