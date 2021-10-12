import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';
import { Request } from 'express';
import { diskStorage } from 'multer';
import {
  imageFileName,
  imageFileFilter,
  imageFilePathProfile,
  imageFilePathCat,
  imageFilePathFood,
  imageFilePathEatery,
} from './image.utils';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { encode } from 'blurhash';
import getStream from 'get-stream';
import { readFile } from 'fs';
import { join } from 'path';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ImageTypeEnum } from './types/Image-type.enum';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('uploadImageProfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: imageFilePathProfile,
        filename: imageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImageProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<ImageEntity> {
    var user: UserEntity = req.user as UserEntity;
    return this.imageService.insertProfileImage(
      user.id,
      file.filename,
      req.body.hash
    );
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('uploadImageEatery')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: imageFilePathEatery,
        filename: imageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadImageEatery(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ): Promise<void> {
    console.log(req.body.hashes);
    var user: UserEntity = req.user as UserEntity;
    files.forEach(async (file, index) => {
      await this.imageService.insertEateryImage(
        user.id,
        file.filename,
        ((files.length > 1) ? req.body.hashes[index] : req.body.hashes),
        req.body.eateryId,
      );
    })
    return;
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('uploadImageFood')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: imageFilePathFood,
  //       filename: imageFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // uploadImageFood(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Req() req: Request,
  // ): Promise<ImageEntity> {
  //   var user: UserEntity = req.user as UserEntity;
  //   return this.imageService.insertImage(
  //     user.id,
  //     file.filename,
  //     file.destination,
  //     req.body.hash,
  //     ImageType.FOOD,
  //   );
  // }


  // @UseGuards(JwtAuthGuard)
  // @Post('uploadImageCat')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: imageFilePathCat,
  //       filename: imageFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // uploadImageCat(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Req() req: Request,
  // ): Promise<ImageEntity> {
  //   var user: UserEntity = req.user as UserEntity;
  //   return this.imageService.insertImage(
  //     user.id,
  //     file.filename,
  //     file.destination,
  //     req.body.hash,
  //     ImageType.CAT,
  //   );
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:filename')
  getImageProfile(@Param('filename') filename, @CurrentUser() user: UserEntity, @Req() req: Request, @Res() res) {
    return res.sendFile(user.id + "/profiles/" + filename, { root: 'upload' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('eatery/:filename')
  getImageEatery(@Param('filename') filename, @CurrentUser() user: UserEntity, @Req() req: Request, @Res() res) {
    return res.sendFile(user.id + "/eateries/" + filename, { root: 'upload' });
  }
}
