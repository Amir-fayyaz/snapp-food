import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { config } from 'dotenv';
import { extname } from 'path';

config();
const { S3_SECRET, S3_ACCESS, S3_BUCKET, S3_ENDPOINT } = process.env;

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: S3_ACCESS,
        secretAccessKey: S3_ACCESS,
      },
      endpoint: S3_ENDPOINT,
      region: 'default',
    });
  }

  async upload(file: Express.Multer.File, folderName: string) {
    const ext = extname(file.originalname); // .png or .jpeg , ...

    return await this.s3
      .upload({
        Bucket: S3_BUCKET,
        Key: `${folderName}/${Date.now()}${ext}`,
        Body: file.buffer,
      })
      .promise();
  }
}
