import { Injectable } from '@nestjs/common';
import { EPost } from './post.entity.js';

@Injectable()
export class PostsService {
  private posts: EPost[] = [
    {
      userId: 1,
      id: 1,
      title: '投稿1',
      body: '内容1',
    },
  ];

  findAll(): EPost[] {
    return this.posts;
  }

  create(request: { userId: number; title: string; body: string }): EPost {
    const { userId, title, body } = request;
    const newPost: EPost = {
      userId,
      id: this.posts.length + 1,
      title,
      body,
    };
    this.posts.push(newPost);
    return newPost;
  }
}
