import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fsPromises } from 'fs';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload-single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',  // Save temporarily in the uploads folder
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),

    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body('filepath') filepath: string) {
    try {
      const imageURL = await this.imageService.uploadImage(file, filepath);

      // After successful upload, delete the local file using fs.promises
      await fsPromises.unlink(`./uploads/${file.filename}`);

      return { imageURL };  // Return the Cloudinary image URL
    } catch (error) {
      return { success: false, message: 'Image upload failed', error };
    }
  }

  // Multiple files upload
  @Post('upload-multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20, {  // Use FilesInterceptor for multiple files
      storage: diskStorage({
        destination: './uploads',  // Save temporarily in the uploads folder
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[], @Body('filepath') filepath: string) {
    try {
      const imageUrls = [];
      // Upload all files to Cloudinary (or any storage provider)
      for (const file of files) {
        filepath = filepath.replace(/^"|"$/g, '');
        const imageURL = await this.imageService.uploadImage(file, filepath);
        imageUrls.push(imageURL);  // Add the Cloudinary URL of the uploaded image

        // After successful upload, delete the local file using fs.promises
        await fsPromises.unlink(`./uploads/${file.filename}`);
      }

      return { imageUrls };  // Return an array of image URLs
    } catch (error) {
      return { success: false, message: 'Image upload failed', error };
    }
  }
}

