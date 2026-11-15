import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { jpMockServer } from '../mocks/jp/index.js';
import { getPosts } from '../mocks/jp/handlers/posts.js';

describe('PostsController', () => {
  let app: INestApplication<App>;

  beforeAll(() => {
    jpMockServer.listen({
      onUnhandledRequest(request, print) {
        const { hostname } = new URL(request.url);

        if (hostname === '127.0.0.1' || hostname === 'localhost') {
          return;
        }

        print.error();
      },
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jpMockServer.resetHandlers();
    await app.close();
  });

  afterAll(() => {
    jpMockServer.close();
  });

  describe('投稿一覧取得', () => {
    it('クエリなしの場合、デフォルトの絞り込みになる', () => {
      const response = {
        total: 100,
        limit: 20,
        page: 1,
        items: getPosts(20),
      };
      return request(app.getHttpServer())
        .get('/posts')
        .expect(200)
        .expect(response);
    });

    it('クエリでの絞り込みが有効である', () => {
      const response = {
        total: 100,
        limit: 1,
        page: 2,
        items: [
          {
            id: 2,
            userId: 2,
            title: 'タイトル 2',
            body: '内容 2',
          },
        ],
      };
      return request(app.getHttpServer())
        .get('/posts?limit=1&page=2')
        .expect(200)
        .expect(response);
    });

    it('不正なクエリが渡された場合、エラーになる', async () => {
      const response = await request(app.getHttpServer())
        .get('/posts?limit=not_number_string')
        .expect(400);

      expect(response.body.message).toBe('リクエストの形式が正しくありません');
    });
  });
});
