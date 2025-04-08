import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();
const { S3_SECRET, S3_ACCESS, S3_BUCKET, S3_ENDPOINT } = process.env;

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = S3_BUCKET;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: S3_ENDPOINT,
      region: 'default',
      credentials: {
        accessKeyId: S3_ACCESS,
        secretAccessKey: S3_SECRET,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = '') {
    const key = folder ? `${folder}/${file.originalname}` : file.originalname;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // برای دسترسی عمومی
    };

    try {
      await this.s3Client.send(
        new PutObjectCommand(uploadParams as PutObjectCommandInput),
      );
      return {
        url: `https://${this.bucketName}.storage.c2.liara.space/${key}`,
        key,
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw new Error('خطا در آپلود فایل');
    }
  }

  async deleteFile(key: string) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      return { success: true, message: 'فایل با موفقیت حذف شد' };
    } catch (error) {
      console.error('Delete Error:', error);
      throw new Error('خطا در حذف فایل');
    }
  }
}
