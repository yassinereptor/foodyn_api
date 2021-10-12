import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetImageArgs } from './dto/args/get-image.args';
import { GetImagesArgs } from './dto/args/get-images.args';
import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imagesService: ImageService) {}

  @Query(() => ImageEntity, { name: 'image', nullable: true })
  @UseGuards(GqlAuthGuard)
  getImage(@Args() getImageArgs: GetImageArgs): Promise<ImageEntity> {
    return this.imagesService.findOneImageById(getImageArgs.id);
  }

  @Query(() => [ImageEntity], { name: 'images', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  getImages(@Args() getImagesArgs: GetImagesArgs): Promise<ImageEntity[]> {
    return this.imagesService.findAllImagesByIds(getImagesArgs.ids);
  }
}
