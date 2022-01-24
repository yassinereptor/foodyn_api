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
} from 'typeorm';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ImageEntity } from 'src/image/entities/image.entity';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { EateryTypeEntity } from './eatery-type.entity';

@ObjectType('Eatery')
@Entity('eateries')
export class EateryEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.eateries)
  user?: UserEntity;

  @Field((type) => [SectionEntity], { nullable: true })
  @OneToMany(() => SectionEntity, (section) => section.eatery, {
    nullable: true,
    cascade: true,
  })
  sections?: SectionEntity[];

  @Field((type) => [ImageEntity], { nullable: true })
  @OneToMany(() => ImageEntity, (image) => image.eatery, {
    nullable: true,
    cascade: true,
  })
  images?: ImageEntity[];

  @Field((type) => [EateryTypeEntity], { nullable: true })
  @ManyToMany(() => EateryTypeEntity, (eateryType) => eateryType.eateries)
  eateryTypes?: EateryTypeEntity[];

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @Column({ nullable: true })
  dialCode?: number;

  @Field({ nullable: true })
  @IsPhoneNumber()
  @Column({ nullable: true })
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  adresse?: string;

  @Field((type) => Boolean, { nullable: true })
  @Column('boolean', { default: false, nullable: true })
  phoneNumberVerified?: boolean;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  city?: string;

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  @Column('float', { nullable: true })
  posLat?: number;

  @Field((type) => Float, { nullable: true })
  @IsLongitude()
  @Column('float', { nullable: true })
  posLng?: number;

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  @Column('float', { nullable: true })
  rate?: number;
  

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
    title,
    description,
    adresse,
    dialCode,
    phoneNumber,
    country,
    city,
    posLat,
    posLng,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.adresse = adresse;
    this.dialCode = dialCode;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.city = city;
    this.posLat = posLat;
    this.posLng = posLng;
  }
}
