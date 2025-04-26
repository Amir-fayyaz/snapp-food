import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../../entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable({})
export class CommentAppService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly Comment_Repository: Repository<CommentEntity>,
  ) {}

  //public methods
  public async createComment() {}
}
