import { Injectable } from '@nestjs/common';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  posts: any[];

  constructor() {
    this.posts = [
      { id: 1, text: 'Hello 1' },
      { id: 2, text: 'Hello 2' },
      { id: 3, text: 'Hello 3' },
    ];
  }

  async getAll() {
    return this.posts;
  }

  async getById(id: string) {
    return this.posts.find((p) => p.id === Number(id));
  }

  async delete(id: string) {
    this.posts = await this.posts.filter((p) => p.id !== Number(id));
    return 'done';
  }

  async update(id: string, dto: PostDto) {
    const postId = await this.posts.findIndex((p) => p.id === Number(id));
    if (postId >= 0) {
      this.posts[postId].text = dto.text;
      return this.posts[postId];
    } else {
      return 'Not found';
    }
  }

  async create(dto: PostDto) {
    const post = { ...dto, id: this.posts.length + 1 };
    this.posts.push(post);
    return post;
  }
}
