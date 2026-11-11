import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service.js';
import { JPPostRepository } from '../repositories/JPPostRepository.js';

describe('PostsService', () => {
  let service: PostsService;

  const postRepositoryMock = {
    get: vi.fn<JPPostRepository['get']>(),
    post: vi.fn<JPPostRepository['post']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: JPPostRepository, useValue: postRepositoryMock },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('findAllで投稿一覧を取得できる', async () => {
    const posts = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
    postRepositoryMock.get.mockResolvedValue(posts);

    expect(await service.findAll()).toEqual(posts);
    expect(postRepositoryMock.get).toHaveBeenCalledOnce();
  });

  it('createで新規投稿が追加される', async () => {
    const post = { userId: 1, id: 1, title: '投稿1', body: '内容1' };
    postRepositoryMock.post.mockResolvedValue(post);

    const newPost = await service.create({
      userId: 2,
      title: '投稿2',
      body: '内容2',
    });

    expect(newPost).toEqual(post);
    expect(postRepositoryMock.post).toHaveBeenCalledWith({
      userId: 2,
      title: '投稿2',
      body: '内容2',
    });
  });
});
