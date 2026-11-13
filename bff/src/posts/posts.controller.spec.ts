import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { JPPostsRepository } from '../repositories/JPPostsRepository.js';

describe('PostsController', () => {
  let controller: PostsController;

  const postsRepositoryMock = {
    get: vi.fn<JPPostsRepository['get']>(),
    post: vi.fn<JPPostsRepository['post']>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        { provide: JPPostsRepository, useValue: postsRepositoryMock },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('findAllで投稿一覧を取得できる', async () => {
    const responseMock = [{ userId: 1, id: 1, title: '投稿1', body: '内容1' }];
    postsRepositoryMock.get.mockResolvedValue(responseMock);

    expect(await controller.findAll()).toEqual(responseMock);
    expect(postsRepositoryMock.get).toHaveBeenCalledOnce();
  });

  it('createに渡された値が、postsRepositoryに連携される', async () => {
    const payload = {
      userId: 2,
      title: '投稿2',
      body: '内容2',
    };

    await controller.create(payload);
    expect(postsRepositoryMock.post).toHaveBeenCalledWith(payload);
  });
});
