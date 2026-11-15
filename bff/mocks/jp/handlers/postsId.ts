import { http, HttpResponse } from 'msw';

const baseUrl = process.env.JP_BASE_URL;

if (!baseUrl) {
  throw new Error('JP_BASE_URL environment variable is required');
}

export const postsIdHandlers = [
  http.get(`${baseUrl}/posts/:id`, ({ params }) => {
    const { id } = params;

    if (id === '999') {
      return HttpResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      id: Number(id),
      userId: 1,
      title: `タイトル ${id}`,
      body: `内容 ${id}`,
    });
  }),

  http.delete(`${baseUrl}/posts/:id`, ({ params }) => {
    const { id } = params;

    if (id === '999') {
      return HttpResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 },
      );
    }

    return HttpResponse.json({});
  }),
];
