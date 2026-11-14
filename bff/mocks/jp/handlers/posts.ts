import { http, HttpResponse } from 'msw';

const posts = (() => {
  const ARRAY_NUM = 100;
  const result = Array(ARRAY_NUM).map((_, index) => {
    const id = index + 1;
    return {
      id,
      userId: id,
      title: `タイトル ${id}`,
      body: `内容 ${id}`,
    };
  });
  return result;
})();

export const postsHandlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(posts);
  }),
];
