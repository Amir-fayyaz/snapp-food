import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentAppService } from '../services/comment.client.service';

@Controller('api/v1/client/comments')
@ApiBearerAuth()
@ApiTags('client-comment')
export class CommentAppController {
  constructor(private readonly CommentService: CommentAppService) {}
}
