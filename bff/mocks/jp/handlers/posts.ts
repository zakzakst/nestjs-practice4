import { http, HttpResponse } from 'msw';

// TODO: 環境変数を参照する
const baseUrl = 'https://jsonplaceholder.typicode.com';

export const getPosts = (num: number) => {
  const result = Array.from({ length: num }, (_, index) => {
    const id = index + 1;
    return {
      id,
      userId: Math.floor(index / 10) + 1,
      title: `タイトル ${id}`,
      body: `内容 ${id}`,
    };
  });
  return result;
};

export const postsHandlers = [
  http.get(`${baseUrl}/posts`, () => {
    return HttpResponse.json(getPosts(100));
  }),

  http.post(`${baseUrl}/posts`, async ({ request }) => {
    const data = (await request.json()) as JPPaths.Posts.Post.Responses.$201;

    return HttpResponse.json(
      {
        ...data,
        id: 1,
      },
      { status: 201 },
    );
  }),
];
