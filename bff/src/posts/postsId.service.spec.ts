import { Test, TestingModule } from '@nestjs/testing';
import { PostsIdService } from './postsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';

describe('PostsIdService', () => {
  let service: PostsIdService;

  const postsIdRepositoryMock = {
    get: vi.fn<JPPostsIdRepository['get']>(),
    put: vi.fn<JPPostsIdRepository['put']>(),
    delete: vi.fn<JPPostsIdRepository['delete']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsIdService,
        { provide: JPPostsIdRepository, useValue: postsIdRepositoryMock },
      ],
    }).compile();

    service = module.get<PostsIdService>(PostsIdService);
  });

  describe('find', () => {
    it('渡されたIDが、postsIdRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.find(id);

      // Assert
      expect(postsIdRepositoryMock.get).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('渡された値が、postsIdRepositoryに連携される', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        userId: 1,
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      await service.update(id, payload);

      // Assert
      expect(postsIdRepositoryMock.put).toHaveBeenCalledWith(id, payload);
    });

    it('リクエストデータの必須項目が不足している場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        title: '投稿2',
        body: '内容2',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.update(id, payload),
      ).rejects.toThrow('リクエストの必須項目が不足しています');
    });

    it('リクエストの形式が正しくない場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        userId: '2',
        title: '投稿2',
        body: '内容2',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.update(id, payload),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
  });

  describe('remove', () => {
    it('渡されたIDが、postsIdRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await service.remove(id);

      // Assert
      expect(postsIdRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
