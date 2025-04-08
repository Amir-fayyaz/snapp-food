// import { Injectable } from '@nestjs/common';
// import { S3 } from 'aws-sdk';
// import { config } from 'dotenv';
// import { extname } from 'path';

// config();
// const { S3_SECRET, S3_ACCESS, S3_BUCKET, S3_ENDPOINT } = process.env;

// @Injectable()
// export class S3Service {
//   private readonly s3: S3;

//   constructor() {
//     this.s3 = new S3({
//       credentials: {
//         accessKeyId: S3_ACCESS,
//         secretAccessKey: S3_SECRET,
//       },
//       endpoint: S3_ENDPOINT,
//       region: 'default',
//     });
//   }

//   async uploadFile(file: Express.Multer.File, folderName: string) {
//     const ext = extname(file.originalname); // .png or .jpeg , ...

//     return await this.s3
//       .upload({
//         Bucket: S3_BUCKET,
//         Key: `${folderName}/${Date.now()}${ext}`,
//         Body: file.buffer,
//       })
//       .promise();
//   }

//   async deleteFile(key: string) {
//     return await this.s3
//       .deleteObject({
//         Bucket: S3_BUCKET,
//         Key: decodeURI(key),
//       })
//       .promise();
//   }
// }

// src/storage/s3.service.ts
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
  private readonly bucketName = S3_BUCKET; // نام سطل خود در لیارا

  constructor() {
    this.s3Client = new S3Client({
      endpoint: S3_ENDPOINT, // آدرس لیارا S3
      region: 'default', // منطقه پیش‌فرض لیارا
      credentials: {
        accessKeyId: S3_ACCESS, // از تنظیمات لیارا
        secretAccessKey: S3_SECRET, // از تنظیمات لیارا
      },
      forcePathStyle: true, // ضروری برای لیارا
    });
  }

  // آپلود فایل
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
        url: `https://${this.bucketName}.storage.liara.space/${key}`,
        key,
      };
    } catch (error) {
      console.error('Upload Error:', error);
      throw new Error('خطا در آپلود فایل');
    }
  }

  // حذف فایل
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
