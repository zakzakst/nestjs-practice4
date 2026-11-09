import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service.js';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('findAllで投稿一覧を取得できる', () => {
    expect(service.findAll()).toEqual([
      {
        userId: 1,
        id: 1,
        title: '投稿1',
        body: '内容1',
      },
    ]);
  });

  it('createで新規投稿が追加される', () => {
    const newPost = service.create({
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

    expect(service.findAll()).toContainEqual(newPost);
  });
});
