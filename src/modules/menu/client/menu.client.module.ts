import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentAppController } from './controllers/comment.client.controller';
import { CommentAppService } from './services/comment.client.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentAppController],
  providers: [CommentAppService],
})
export class MenuAppModule {}
