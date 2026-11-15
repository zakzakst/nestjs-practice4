import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service.js';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';

describe('PostsService', () => {
  let service: PostsService;

  const postsRepositoryMock = {
    get: vi.fn<JPPostsRepository['get']>(),
    post: vi.fn<JPPostsRepository['post']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: JPPostsRepository, useValue: postsRepositoryMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  describe('findAll', () => {
    it('投稿一覧を取得できる', async () => {
      // Arrange
      const posts = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
      postsRepositoryMock.get.mockResolvedValue(posts);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual({
        total: 1,
        limit: 20,
        page: 1,
        items: posts,
      });
      expect(postsRepositoryMock.get).toHaveBeenCalledOnce();
    });

    it('リクエストデータの値に応じて、データが絞り込まれる', async () => {
      // Arrange
      const posts = [
        { userId: 1, id: 1, title: '投稿1', body: '内容1' },
        { userId: 2, id: 2, title: '投稿2', body: '内容2' },
      ];
      postsRepositoryMock.get.mockResolvedValue(posts);

      // Act
      const result = await service.findAll({
        limit: 1,
        page: 2,
      });

      // Assert
      expect(result).toEqual({
        total: 2,
        limit: 1,
        page: 2,
        items: [{ userId: 2, id: 2, title: '投稿2', body: '内容2' }],
      });
    });

    it('リクエストの形式が正しくない場合、エラーになる', async () => {
      // Arrange
      const request = {
        page: '2',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.findAll(request),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
  });

  describe('create', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const request = {
        userId: 2,
        title: '投稿2',
        body: '内容2',
      };

      // Act
      await service.create(request);

      // Assert
      expect(postsRepositoryMock.post).toHaveBeenCalledWith(request);
    });

    it('リクエストデータの必須項目が不足している場合、エラーになる', async () => {
      // Arrange
      const request = {
        title: '投稿2',
        body: '内容2',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.create(request),
      ).rejects.toThrow('リクエストの必須項目が不足しています');
    });

    it('リクエストの形式が正しくない場合、エラーになる', async () => {
      // Arrange
      const request = {
        userId: '2',
        title: '投稿2',
        body: '内容2',
      };

      // Assert
      await expect(
        // @ts-expect-error
        service.create(request),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
  });
});
