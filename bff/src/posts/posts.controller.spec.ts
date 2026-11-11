import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostRepository } from '../repositories/JPPostRepository.js';

describe('PostsController', () => {
  let controller: PostsController;

  const postRepositoryMock = {
    get: vi.fn<JPPostRepository['get']>(),
    post: vi.fn<JPPostRepository['post']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        { provide: JPPostRepository, useValue: postRepositoryMock },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('findAllで投稿一覧を取得できる', async () => {
    const posts = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
    postRepositoryMock.get.mockResolvedValue(posts);

    expect(await controller.findAll()).toEqual(posts);
    expect(postRepositoryMock.get).toHaveBeenCalledOnce();
  });

  it('createで新規投稿が追加される', async () => {
    const post = { userId: 1, id: 1, title: '投稿1', body: '内容1' };
    postRepositoryMock.post.mockResolvedValue(post);

    const newPost = await controller.create({
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
