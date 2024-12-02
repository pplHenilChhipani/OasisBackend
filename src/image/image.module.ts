import { Module } from '@nestjs/common';
import { FirebaseImageService } from 'src/firebase/firebase-image.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
    imports: [],
    controllers: [ImageController],
    providers: [ImageService, FirebaseImageService],
})
export class ImageModule {}
