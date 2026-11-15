import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { jpMockServer } from '../mocks/jp/index.js';

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

  it('投稿一覧取得', () => {
    const response = {
      total: 100,
      limit: 1,
      page: 1,
      items: [
        {
          id: 1,
          userId: 1,
          title: 'タイトル 1',
          body: '内容 1',
        },
      ],
    };
    return request(app.getHttpServer())
      .get('/posts?limit=1')
      .expect(200)
      .expect(response);
  });
});
