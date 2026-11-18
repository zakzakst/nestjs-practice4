import { Test, TestingModule } from '@nestjs/testing';
import { PostDetailsController } from './post-details.controller.js';
import { PostDetailsIdService } from './post-detailsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';
import { JPUsersIdRepository } from '../repositories/JPUsersIdRepository.js';

describe('PostDetailsController', () => {
  let controller: PostDetailsController;

  const postsIdRepositoryMock = {
    get: vi.fn<JPPostsIdRepository['get']>(),
  };

  const usersIdRepositoryMock = {
    get: vi.fn<JPUsersIdRepository['get']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostDetailsController],
      providers: [
        PostDetailsIdService,
        { provide: JPPostsIdRepository, useValue: postsIdRepositoryMock },
        { provide: JPUsersIdRepository, useValue: usersIdRepositoryMock },
      ],
    }).compile();

    controller = module.get<PostDetailsController>(PostDetailsController);
  });

  describe('find', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
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
      await controller.find(id);

      // Assert
      expect(postsIdRepositoryMock.get).toHaveBeenCalledWith(id);
      expect(usersIdRepositoryMock.get).toHaveBeenCalledWith(userId);
    });
  });
});
