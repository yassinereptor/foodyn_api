import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { isNullableType } from 'graphql';
import { ImageEntity } from 'src/image/entities/image.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('Profile')
@Entity('profiles')
export class ProfileEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @OneToOne(() => UserEntity, { nullable: true, cascade: true })
  @JoinColumn()
  user?: UserEntity;

  @Field((type) => ImageEntity, { nullable: true })
  @OneToOne(() => ImageEntity, { nullable: true, cascade: true })
  @JoinColumn()
  image?: ImageEntity;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  fullname: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  adresse?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  dialCode?: number;

  @Field({ nullable: true })
  @IsPhoneNumber()
  @Column({ nullable: true })
  phoneNumber?: string;

  @Field((type) => Boolean, { nullable: true })
  @Column('boolean', { default: false, nullable: true })
  phoneNumberVerified?: boolean;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  country?: number;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  city?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  zipCode?: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  gender?: number;

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  @Column('float', { nullable: true })
  posLat?: number;

  @Field((type) => Float, { nullable: true })
  @IsLongitude()
  @Column('float', { nullable: true })
  posLng?: number;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(
    id,
    fullname,
    adresse,
    dialCode,
    phoneNumber,
    country,
    city,
    zipCode,
    gender,
    posLat,
    posLng,
  ) {
    this.id = id;
    this.fullname = fullname;
    this.adresse = adresse;
    this.dialCode = dialCode;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.city = city;
    this.zipCode = zipCode;
    this.gender = gender;
    this.posLat = posLat;
    this.posLng = posLng;
  }
}
