import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostDto } from './post.dto';

@Controller('post')
export class PostController {
  posts: any[];

  constructor() {
    this.posts = [
      { id: 1, text: 'Hello 1' },
      { id: 2, text: 'Hello 2' },
      { id: 3, text: 'Hello 3' },
    ];
  }

  @Get()
  async getAll() {
    return this.posts;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.posts.find((p) => p.id === Number(id));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.posts = await this.posts.filter((p) => p.id !== Number(id));
    return 'done';
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: PostDto) {
    const postId = await this.posts.findIndex((p) => p.id === Number(id));
    if (postId >= 0) {
      this.posts[postId].text = dto.text;
      return this.posts[postId];
    } else {
      return 'Not found';
    }
  }

  @Post()
  async create(@Body() dto: PostDto) {
    const post = { ...dto, id: this.posts.length + 1 };
    this.posts.push(post);
    return post;
  }
}
