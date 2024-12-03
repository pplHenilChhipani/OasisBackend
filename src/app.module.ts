import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageModule } from './image/image.module';
import * as dotenv from 'dotenv';
dotenv.config(); 
@Module({
    imports: [ImageModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
