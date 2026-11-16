import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersIdService } from './usersId.service.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

describe('UsersController', () => {
  let controller: UsersController;

  const usersIdRepositoryMock = {
    get: vi.fn<JPUsersIdRepository['get']>(),
    put: vi.fn<JPUsersIdRepository['put']>(),
    delete: vi.fn<JPUsersIdRepository['delete']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersIdService,
        { provide: JPUsersIdRepository, useValue: usersIdRepositoryMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('find', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await controller.find(id);

      // Assert
      expect(usersIdRepositoryMock.get).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await controller.remove(id);

      // Assert
      expect(usersIdRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
