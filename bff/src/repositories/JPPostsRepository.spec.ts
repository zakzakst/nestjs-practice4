import {
  ApiInternalServerErrorException,
  ApiBadGatewayException,
} from '../exceptions/ApiError.js';
import { JPErrors } from '../exceptions/JPErrors.js';
import { ConfigService } from '@nestjs/config';
import { JPPostsRepository } from './JPPostsRepository.js';

describe('JPPostsRepository', () => {
  let repository: JPPostsRepository;
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    repository = new JPPostsRepository(
      new ConfigService({
        JP_BASE_URL: 'http://127.0.0.1:3000/dummy-jp/posts',
      }),
    );
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('get', () => {
    it('fetchに失敗した場合、JP500_01をスローする', async () => {
      const error = new Error('dummy error');
      fetchMock.mockRejectedValue(error);

      const result = repository.get();

      await expect(result).rejects.toBeInstanceOf(
        ApiInternalServerErrorException,
      );
      await expect(result).rejects.toMatchObject(JPErrors.JP500_01(error));
    });

    it('外部API通信応答エラーが発生した場合、JP502_01をスローする', async () => {
      const response = new Response(null, { status: 500 });
      fetchMock.mockResolvedValue(response);

      const result = repository.get();

      await expect(result).rejects.toBeInstanceOf(ApiBadGatewayException);
      await expect(result).rejects.toMatchObject(JPErrors.JP502_01(response));
    });
  });

  describe('post', () => {
    it('fetchに失敗した場合、JP500_01をスローする', async () => {
      const error = new Error('dummy error');
      fetchMock.mockRejectedValue(error);

      const result = repository.post({
        userId: 1,
        title: '投稿',
        body: '内容',
      });

      await expect(result).rejects.toBeInstanceOf(
        ApiInternalServerErrorException,
      );
      await expect(result).rejects.toMatchObject(JPErrors.JP500_01(error));
    });

    it('外部API通信応答エラーが発生した場合、JP502_01をスローする', async () => {
      const response = new Response(null, { status: 500 });
      fetchMock.mockResolvedValue(response);

      const result = repository.post({
        userId: 1,
        title: '投稿',
        body: '内容',
      });

      await expect(result).rejects.toBeInstanceOf(ApiBadGatewayException);
      await expect(result).rejects.toMatchObject(JPErrors.JP502_01(response));
    });
  });
});
