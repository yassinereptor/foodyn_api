import { SectionEntity } from './section.entity';
import { ObjectType, Int, Field, Float } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ImageEntity } from 'src/image/entities/image.entity';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

@ObjectType('CategoryIconPackage')
@Entity('categoryiconpackages')
export class CategoryIconPackageEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsString()
  @Column()
  title: string;

  @Field((type) => [ImageEntity], { nullable: true })
  @OneToMany(() => ImageEntity, (image) => image.categoryIconPackage, {
    nullable: true,
    cascade: true,
  })
  images?: ImageEntity[];

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
