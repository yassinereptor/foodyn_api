import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EateryEntity } from 'src/eatery/entities/eatery.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ImageTypeEnum } from '../types/Image-type.enum';

@ObjectType('Image')
@Entity('images')
export class ImageEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.images, { nullable: true })
  @JoinColumn()
  user?: UserEntity;

  @Field((type) => EateryEntity, { nullable: true })
  @ManyToOne(() => EateryEntity, (eateries) => eateries.images, { nullable: true })
  @JoinColumn()
  eateries?: EateryEntity;

  @Field((type) => Int)
  @IsNotEmpty()
  @IsNumber()
  @Column()
  type: ImageTypeEnum;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  filename: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  filepath: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  hash: string;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(type: number, filename: string, filepath: string) {
    this.type = type;
    this.filename = filename;
    this.filepath = filepath;
  }
}
