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

    it.todo('リクエストデータの値に応じて、データが絞り込まれる', () => {});

    it.todo('リクエストデータが不正な場合エラーになる', () => {});
  });

  describe('create', () => {
    it('新規投稿が追加される', async () => {
      // Arrange
      const post = { userId: 1, id: 1, title: '投稿1', body: '内容1' };
      postsRepositoryMock.post.mockResolvedValue(post);

      // Act
      const result = await service.create({
        userId: 2,
        title: '投稿2',
        body: '内容2',
      });

      // Assert
      expect(result).toEqual(post);
      expect(postsRepositoryMock.post).toHaveBeenCalledWith({
        userId: 2,
        title: '投稿2',
        body: '内容2',
      });
    });

    it.todo('リクエストデータが不正な場合エラーになる', () => {});
  });
});
