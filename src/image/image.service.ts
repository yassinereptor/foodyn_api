import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { UserEntity } from '../user/entities/user.entity';
import { join } from 'path';
import { readFile, readFileSync } from 'fs';
import { encode } from 'blurhash';
import { ImageTypeEnum } from './types/Image-type.enum';
import { EateryEntity } from 'src/eatery/entities/eatery.entity';
// import { Image } from 'typescript'
var sizeOf = require('buffer-image-size');

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imagesRepository: Repository<ImageEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(EateryEntity)
    private eateriesRepository: Repository<EateryEntity>,
  ) {}

  findAllImagesByIds(ids: number[]): Promise<ImageEntity[]> {
    return this.imagesRepository.find({
      where: { id: ids },
      relations: ['user'],
    });
  }

  findAllImagesByUser(user: UserEntity): Promise<ImageEntity[]> {
    return this.imagesRepository.find({
      where: { user: user },
      relations: ['user'],
    });
  }

  findOneImageById(id: number): Promise<ImageEntity> {
    return this.imagesRepository.findOne(id, { relations: ['user'] });
  }

  findOneImageByUuid(filename: string): Promise<ImageEntity> {
    return this.imagesRepository.findOne({
      where: { filename: filename },
      relations: ['user'],
    });
  }

  updateImage(image: ImageEntity): Promise<ImageEntity> {
    return this.imagesRepository.save(image);
  }

  async insertProfileImage(
    userId: number,
    filename: string,
    hash: string
  ): Promise<ImageEntity> {
    var user = await this.usersRepository.findOne(userId);
    var newImage = this.imagesRepository.create({
      user,
      filename,
      filepath: "/image/profile/",
      hash,
      type: ImageTypeEnum.PROFILE,
    });
    newImage = await this.imagesRepository.save(newImage);
    user.image = newImage;
    await this.usersRepository.save(user);
    return newImage;
  }

  async insertEateryImage(
    userId: number,
    filename: string,
    hash: string,
    eateryId: number
  ): Promise<ImageEntity> {
    var user = await this.usersRepository.findOne(userId);
    var newImage = this.imagesRepository.create({
      user,
      filename,
      filepath: "/image/eatery/",
      hash,
      type: ImageTypeEnum.EATERY,
    });
    newImage = await this.imagesRepository.save(newImage);
    var eatery = await this.eateriesRepository.findOne(eateryId);
    eatery.images = [newImage];
    await this.eateriesRepository.save(eatery)
    return newImage;
  }

  async deleteImage(id: string): Promise<void> {
    await this.imagesRepository.softDelete(id);
  }

  async restoreUser(id: string): Promise<void> {
    await this.imagesRepository.restore(id);
  }
}
