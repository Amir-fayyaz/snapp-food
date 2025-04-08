import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { UploadFileS3 } from 'src/common/interceptors/uploadFile.interceptor';
import { StorageFolderName } from 'src/common/enums/storage-folderNames.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/v1/image')
export class S3Controller {
  constructor(private readonly S3Service: S3Service) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'For upload file',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'enable file formats : (png, jpg, jpeg, webp)',
        },
      },
      required: ['image'],
    },
  })
  @ApiQuery({
    name: 'folderName',
    description: 'folderName for save images',
    enum: StorageFolderName,
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Query('folderName') folerName: StorageFolderName,
  ) {
    return await this.S3Service.uploadFile(image, folerName);
  }
}
