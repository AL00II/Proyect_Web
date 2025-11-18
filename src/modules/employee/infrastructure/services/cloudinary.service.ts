import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PhotoUploaderPort } from '../../application/ports/photo-uploader.port';

@Injectable()
export class CloudinaryService extends PhotoUploaderPort {
  
  constructor() {
    super();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

    async upload(file: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
            { folder: 'employees' },
            (error, result) => {
                if (error) return reject(error);

                if (!result || !result.secure_url) {
                return reject(new Error('Cloudinary no devolvió secure_url'));
                }

                resolve(result.secure_url);
            }
            ).end(file);
        });
    }
}
