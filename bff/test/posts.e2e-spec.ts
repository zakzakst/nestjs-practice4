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
    it('クエリなしの場合、デフォルトの絞り込みになる', async () => {
      // Arrange
      const response = {
        total: 100,
        limit: 20,
        page: 1,
        items: getPosts(20),
      };

      // Assert
      return request(app.getHttpServer())
        .get('/posts')
        .expect(200)
        .expect(response);
    });

    it('クエリでの絞り込みが有効である', () => {
      // Arrange
      const response = {
        total: 100,
        limit: 1,
        page: 2,
        items: [
          {
            id: 2,
            userId: 1,
            title: 'タイトル 2',
            body: '内容 2',
          },
        ],
      };

      // Assert
      return request(app.getHttpServer())
        .get('/posts?limit=1&page=2')
        .expect(200)
        .expect(response);
    });

    it('不正なクエリが送られた場合、エラーになる', async () => {
      // Act
      const response = await request(app.getHttpServer())
        .get('/posts?limit=not_number_string')
        .expect(400);

      // Assert
      expect(response.body.message).toBe('リクエストの形式が正しくありません');
    });
  });

  describe('新規投稿作成', () => {
    it('正しいリクエストが送られた場合、新規投稿が作成される', () => {
      // Arrange
      const post = {
        userId: 1,
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Assert
      return request(app.getHttpServer())
        .post('/posts')
        .send(post)
        .expect(201)
        .expect({
          ...post,
          id: 1,
        });
    });

    it('形式が正しくないリクエストが送られた場合、エラーになる', async () => {
      // Arrange
      const post = {
        userId: '1',
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/posts')
        .send(post)
        .expect(400);

      // Assert
      expect(response.body.message).toBe('リクエストの形式が正しくありません');
    });

    it('必須項目不足のリクエストが送られた場合、エラーになる', async () => {
      // Arrange
      const post = {
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      const response = await request(app.getHttpServer())
        .post('/posts')
        .send(post)
        .expect(400);

      // Assert
      expect(response.body.message).toBe(
        'リクエストの必須項目が不足しています',
      );
    });
  });

  describe('投稿取得', () => {
    it('投稿が取得できる', async () => {
      // Assert
      return request(app.getHttpServer()).get('/posts/1').expect(200).expect({
        id: 1,
        userId: 1,
        title: 'タイトル 1',
        body: '内容 1',
      });
    });

    it('指定した投稿が存在しない場合、エラーになる', async () => {
      // Act
      const response = await request(app.getHttpServer())
        .get('/posts/999')
        .expect(404);

      // Assert
      expect(response.body.message).toBe(
        '指定された投稿データが見つかりません',
      );
    });
  });

  describe('投稿更新', () => {
    it('投稿が更新できる', async () => {
      // Arrange
      const post = {
        id: 1,
        userId: 1,
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Assert
      return request(app.getHttpServer())
        .put('/posts/1')
        .send(post)
        .expect(200)
        .expect(post);
    });

    it('形式が正しくないリクエストが送られた場合、エラーになる', async () => {
      // Arrange
      const post = {
        id: 1,
        userId: '1',
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      const response = await request(app.getHttpServer())
        .put('/posts/1')
        .send(post)
        .expect(400);

      // Assert
      expect(response.body.message).toBe('リクエストの形式が正しくありません');
    });

    it('必須項目不足のリクエストが送られた場合、エラーになる', async () => {
      // Arrange
      const post = {
        id: 1,
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      const response = await request(app.getHttpServer())
        .put('/posts/1')
        .send(post)
        .expect(400);

      // Assert
      expect(response.body.message).toBe(
        'リクエストの必須項目が不足しています',
      );
    });

    it('指定した投稿が存在しない場合、エラーになる', async () => {
      // Arrange
      const post = {
        id: 999,
        userId: 1,
        title: 'タイトル 1',
        body: '内容 1',
      };

      // Act
      const response = await request(app.getHttpServer())
        .put('/posts/999')
        .send(post)
        .expect(404);

      // Assert
      expect(response.body.message).toBe(
        '指定された投稿データが見つかりません',
      );
    });
  });

  describe('投稿削除', () => {
    it('投稿が削除できる', async () => {
      // Assert
      return request(app.getHttpServer())
        .delete('/posts/1')
        .expect(204)
        .expect({});
    });

    it('指定した投稿が存在しない場合、エラーになる', async () => {
      // Act
      const response = await request(app.getHttpServer())
        .delete('/posts/999')
        .expect(404);

      // Assert
      expect(response.body.message).toBe(
        '指定された投稿データが見つかりません',
      );
    });
  });
});
