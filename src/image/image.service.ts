// import { Injectable } from '@nestjs/common';
// import { FirebaseImageService } from '../firebase/firebase-image.service';

// @Injectable()
// export class ImageService {
//     constructor(private readonly firebaseImageService: FirebaseImageService) {}

//     async uploadImage(file): Promise<string> {
//         const storage = this.firebaseImageService.getStorageInstance();
//         const bucket = storage.bucket();

//         const fileName = `${Date.now()}_${file.originalname}`;
//         const fileUpload = bucket.file(fileName);

//         const stream = fileUpload.createWriteStream({
//             metadata: {
//                 contentType: file.mimetype,
//             },
//         });

//         return new Promise((resolve, reject) => {
//             stream.on('error', (error) => {
//                 reject(error);
//             });

//             stream.on('finish', () => {
//                 const imageURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//                 resolve(imageURL);
//             });

//             stream.end(file.buffer);
//         });
//     }
// }


// import { Injectable } from '@nestjs/common';
// import * as cloudinary from 'cloudinary';
// import { UploadApiResponse, v2 } from 'cloudinary';

// // Cloudinary configuration
// cloudinary.v2.config({
//   cloud_name: 'dv3azr7ol',    // Replace with your Cloudinary cloud name
//   api_key: '397879743262839',         // Replace with your Cloudinary API key
//   api_secret: 'BoCfh0WP9iI52sEDE00UE1p6EjU',   // Replace with your Cloudinary API secret
// });

// @Injectable()
// export class ImageService {
//   // Function to upload image to Cloudinary
//   async uploadImage(file: Express.Multer.File): Promise<string> {
//     try {
//       // Upload image to Cloudinary
//       const uploadResponse: UploadApiResponse = await cloudinary.v2.uploader.upload(file.path, {
//         folder: 'Oasis', // Optional: you can specify a folder on Cloudinary for organization
//         public_id: `${Date.now()}_${file.originalname}`,  // Optional: create a unique public ID for each image
//         resource_type: 'image',      // Type of resource (image/video/etc.)
//         fetch_format: 'auto',
//         quality: 'auto'
//       });

//       // Return the URL of the uploaded image
//       return uploadResponse.secure_url;
//     } catch (error) {
//       console.error('Error uploading image to Cloudinary:', error);
//       throw new Error('Failed to upload image to Cloudinary');
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Express } from 'express';

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,    // Replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,         // Replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET,   // Replace with your Cloudinary API secret
});

@Injectable()
export class ImageService {
  // Function to upload an image to Cloudinary
  async uploadImage(file: Express.Multer.File, filepath: string): Promise<string> {
    try {
      // Upload image to Cloudinary
      
      const uploadResponse: UploadApiResponse = await cloudinary.v2.uploader.upload(file.path, {
        folder: filepath, // Optional: specify a folder on Cloudinary
        public_id: `${Date.now()}_${file.originalname}`,  // Optional: use a unique public ID
        resource_type: 'image',      // Ensure you're uploading an image
      });

      // Return the Cloudinary URL for the uploaded image
      return uploadResponse.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }
}
