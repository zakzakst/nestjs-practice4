import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('findAllで投稿一覧を取得できる', () => {
    expect(controller.findAll()).toEqual([
      {
        userId: 1,
        id: 1,
        title: '投稿1',
        body: '内容1',
      },
    ]);
  });

  it('createで新規投稿が追加される', () => {
    const newPost = controller.create({
      userId: 2,
      title: '投稿2',
      body: '内容2',
    });

    expect(newPost).toEqual({
      userId: 2,
      id: 2,
      title: '投稿2',
      body: '内容2',
    });

    expect(controller.findAll()).toContainEqual(newPost);
  });
});
