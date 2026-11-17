import { Test, TestingModule } from '@nestjs/testing';
import { UsersIdService } from './usersId.service.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

const mockUser: BFFComponents.Schemas.User = {
  id: 1,
  name: '山田 太郎',
  username: 'ヤマちゃん',
  email: 'yamada@mail.com',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone: '08012345678',
  website: 'https://www.yamada.com',
  company: {
    name: '株式会社○○',
    catchPhrase: '✕✕に関する不安をすべて解決',
    bs: '',
  },
};

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
    it('渡された値が、usersIdRepositoryMockに連携される', async () => {
      // Arrange
      const id = 1;
      const body = mockUser;

      // Act
      await service.update(id, body);

      // Assert
      expect(usersIdRepositoryMock.put).toHaveBeenCalledWith(id, body);
    });

    it('リクエストデータの必須項目が不足している場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const { username: _username, ...body } = mockUser;

      // Assert
      await expect(
        // @ts-expect-error
        service.update(id, body),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });

    it('リクエストの形式が正しくない場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const body = {
        ...mockUser,
        id: '1',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.update(id, body),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
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
