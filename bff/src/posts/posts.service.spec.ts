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
      const posts = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
      postsRepositoryMock.get.mockResolvedValue(posts);

      expect(await service.findAll()).toEqual(posts);
      expect(postsRepositoryMock.get).toHaveBeenCalledOnce();
    });
  });

  describe('create', () => {
    it('新規投稿が追加される', async () => {
      const post = { userId: 1, id: 1, title: '投稿1', body: '内容1' };
      postsRepositoryMock.post.mockResolvedValue(post);

      const newPost = await service.create({
        userId: 2,
        title: '投稿2',
        body: '内容2',
      });

      expect(newPost).toEqual(post);
      expect(postsRepositoryMock.post).toHaveBeenCalledWith({
        userId: 2,
        title: '投稿2',
        body: '内容2',
      });
    });
  });
});
