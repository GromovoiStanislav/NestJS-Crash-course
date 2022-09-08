import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getAll() {
    return this.postRepository.find();
  }

  async getById(id: string) {
    const post = await this.postRepository.findOne({
      where: { id: Number(id) },
    });
    if (post) {
      return post;
    } else {
      return 'Not found';
    }
  }

  async delete(id: string) {
    await this.postRepository.delete({ id: Number(id) });
    return 'done';
  }

  async update(id: string, dto: PostDto) {
    const post = await this.postRepository.findOne({
      where: { id: Number(id) },
    });
    if (post) {
      post.content = dto.content;
      post.userName = dto.userName;
      return this.postRepository.save(post);
    } else {
      return 'Not found';
    }
  }

  async create(dto: PostDto) {
    const post = this.postRepository.create(dto);
    return this.postRepository.save(post);
  }
}
