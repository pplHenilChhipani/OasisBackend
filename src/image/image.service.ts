import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { Express } from 'express';

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
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
        public_id: `${file.originalname}`,  // Optional: use a unique public ID
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
