import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    // @Post('upload-image')
    // @UseInterceptors(
    //     FileInterceptor('image', {
    //         storage: diskStorage({
    //             destination: './uploads',
    //             filename: editFileName,
    //         }),
    //         fileFilter: imageFileFilter,
    //     }),
    // )
    // async func(@UploadedFile() file, @Body() body) {
    //     try {
    //         body.image = file.filename;
    //         body.view = false;
    //         let res = await this.yourService.yourFunc(body);
    //         return {
    //             success: true,
    //             data: res,
    //         };
    //     } catch (err) {
    //         console.log(err);
    //         return {
    //             success: false,
    //             data: err,
    //         };
    //     }
    // }
}
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = '.' + file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
