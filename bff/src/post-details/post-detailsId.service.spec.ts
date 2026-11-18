import { Test, TestingModule } from '@nestjs/testing';
import { PostDetailsIdService } from './post-detailsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

describe('PostDetailsIdService', () => {
  let service: PostDetailsIdService;

  const postsIdRepositoryMock = {
    get: vi.fn<JPPostsIdRepository['get']>(),
  };

  const usersIdRepositoryMock = {
    get: vi.fn<JPUsersIdRepository['get']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostDetailsIdService,
        { provide: JPPostsIdRepository, useValue: postsIdRepositoryMock },
        { provide: JPUsersIdRepository, useValue: usersIdRepositoryMock },
      ],
    }).compile();

    service = module.get<PostDetailsIdService>(PostDetailsIdService);
  });

  describe('find', () => {
    it('渡されたIDが、postsIdRepositoryに連携される', async () => {
      // Arrange
      const id = 1;
      const userId = 2;
      const mockUser = {
        username: '',
        email: '',
      };
      postsIdRepositoryMock.get.mockResolvedValue({
        id,
        userId,
        title: '',
        body: '',
      });
      // @ts-expect-error
      usersIdRepositoryMock.get.mockResolvedValue(mockUser);

      // Act
      await service.find(id);

      // Assert
      expect(postsIdRepositoryMock.get).toHaveBeenCalledWith(id);
      expect(usersIdRepositoryMock.get).toHaveBeenCalledWith(userId);
    });
  });
});
