import { Test, TestingModule } from '@nestjs/testing';
import { UsersIdService } from './usersId.service.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

describe('UsersIdService', () => {
  let service: UsersIdService;

  const usersIdRepositoryMock = {
    get: vi.fn<JPUsersIdRepository['get']>(),
    put: vi.fn<JPUsersIdRepository['put']>(),
    delete: vi.fn<JPUsersIdRepository['delete']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersIdService,
        { provide: JPUsersIdRepository, useValue: usersIdRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersIdService>(UsersIdService);
  });

  describe('find', () => {
    it('渡されたIDが、usersIdRepositoryMockに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.find(id);

      // Assert
      expect(usersIdRepositoryMock.get).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it.todo('渡された値が、usersIdRepositoryMockに連携される', async () => {});

    it.todo(
      'リクエストデータの必須項目が不足している場合、エラーになる',
      async () => {},
    );

    it.todo('リクエストの形式が正しくない場合、エラーになる', async () => {});
  });

  describe('remove', () => {
    it('渡されたIDが、usersIdRepositoryMockに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.remove(id);

      // Assert
      expect(usersIdRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
