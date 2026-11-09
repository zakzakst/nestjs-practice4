import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: BFFComponents.Schemas.Post[] = [
    {
      userId: 1,
      id: 1,
      title: '投稿1',
      body: '内容1',
    },
  ];

  findAll(): BFFPaths.Posts.Get.Responses.$200 {
    return this.posts;
  }

  create(
    request: BFFPaths.Posts.Post.RequestBody,
  ): BFFPaths.Posts.Post.Responses.$201 {
    const { userId, title, body } = request;
    const newPost: BFFComponents.Schemas.Post = {
      userId,
      id: this.posts.length + 1,
      title,
      body,
    };
    this.posts.push(newPost);
    return newPost;
  }
}
