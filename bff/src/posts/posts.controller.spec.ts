import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';
import { PostsIdService } from './postsId.service.js';
import { JPPostsIdRepository } from '../repositories/JPPostsIdRepository.js';

describe('PostsController', () => {
  let controller: PostsController;

  const postsRepositoryMock = {
    get: vi.fn<JPPostsRepository['get']>(),
    post: vi.fn<JPPostsRepository['post']>(),
  };

  const postsIdRepositoryMock = {
    get: vi.fn<JPPostsIdRepository['get']>(),
    put: vi.fn<JPPostsIdRepository['put']>(),
    delete: vi.fn<JPPostsIdRepository['delete']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        { provide: JPPostsRepository, useValue: postsRepositoryMock },
        PostsIdService,
        { provide: JPPostsIdRepository, useValue: postsIdRepositoryMock },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  describe('findAll', () => {
    it('投稿一覧を取得できる', async () => {
      // Arrange
      const posts = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
      postsRepositoryMock.get.mockResolvedValue(posts);

      // Act
      const result = await controller.findAll();

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
      const result = await controller.findAll({
        limit: '1',
        page: '2',
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
        page: 'not number string',
      };

      // Assert
      await expect(controller.findAll(request)).rejects.toThrow(
        'リクエストの形式が正しくありません',
      );
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
      await controller.create(request);

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
        controller.create(request),
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
        controller.create(request),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
  });

  describe('find', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await controller.find(id);

      // Assert
      expect(postsIdRepositoryMock.get).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        userId: 1,
        title: '投稿1',
        body: '内容1',
      };

      // Act
      await controller.update(id, payload);

      // Assert
      expect(postsIdRepositoryMock.put).toHaveBeenCalledWith(id, payload);
    });

    it('リクエストデータの必須項目が不足している場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        title: '投稿1',
        body: '内容1',
      };

      // Assert
      await expect(
        // @ts-expect-error
        controller.update(id, payload),
      ).rejects.toThrow('リクエストの必須項目が不足しています');
    });

    it('リクエストの形式が正しくない場合、エラーになる', async () => {
      // Arrange
      const id = 1;
      const payload = {
        id,
        userId: '1',
        title: '投稿1',
        body: '内容1',
      };

      // Assert
      await expect(
        // @ts-expect-error
        controller.update(id, payload),
      ).rejects.toThrow('リクエストの形式が正しくありません');
    });
  });

  describe('remove', () => {
    it('渡された値が、postsRepositoryに連携される', async () => {
      // Arrange
      const id = 1;

      // Act
      await controller.remove(id);

      // Assert
      expect(postsIdRepositoryMock.delete).toHaveBeenCalledWith(id);
    });
  });
});
