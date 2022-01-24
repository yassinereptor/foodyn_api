import { UserStatusEnum } from '../status/user-status.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ImageEntity } from 'src/image/entities/image.entity';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { RecordEntity } from 'src/record/entities/record.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { UserTypeEnum } from '../types/user-type.enum';
import { EateryEntity } from 'src/eatery/entities/eatery.entity';
import { GroupEntity } from './group.entity';
import { CategoryEntity } from 'src/eatery/entities/category.entity';
import { FoodEntity } from 'src/eatery/entities/food.entity';

@ObjectType('User')
@Entity('users')
export class UserEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column()
  type: UserTypeEnum;

  @Field((type) => ImageEntity, { nullable: true })
  @OneToOne(() => ImageEntity, { nullable: true, cascade: true })
  @JoinColumn()
  image?: ImageEntity;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  fullname?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  username: string;

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

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  city?: string;

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

  @Field((type) => [MembershipEntity], { nullable: true })
  @OneToMany(() => MembershipEntity, (membership) => membership.user, {
    nullable: true,
    cascade: true,
  })
  memberships?: MembershipEntity[];

  @Field((type) => [RecordEntity], { nullable: true })
  @OneToMany(() => RecordEntity, (record) => record.user, {
    nullable: true,
    cascade: true,
  })
  records?: RecordEntity[];

  @Field((type) => [ImageEntity], { nullable: true })
  @OneToMany(() => ImageEntity, (image) => image.user, {
    nullable: true,
    cascade: true,
  })
  images?: ImageEntity[];

  @Field((type) => [GroupEntity], { nullable: true })
  @OneToMany(() => GroupEntity, (group) => group.user, {
    nullable: true,
    cascade: true,
  })
  groups?: GroupEntity[];

  @Field((type) => [TokenEntity], { nullable: true })
  @OneToMany(() => TokenEntity, (token) => token.user, {
    nullable: true,
    cascade: true,
  })
  tokens?: TokenEntity[];

  @Field((type) => [EateryEntity], { nullable: true })
  @OneToMany(() => EateryEntity, (eateries) => eateries.user, {
    nullable: true,
    cascade: true,
  })
  eateries?: EateryEntity[];

  @Field((type) => [CategoryEntity], { nullable: true })
  @OneToMany(() => CategoryEntity, (categories) => categories.user, {
    nullable: true,
    cascade: true,
  })
  categories?: CategoryEntity[];

  @Field((type) => [FoodEntity], { nullable: true })
  @OneToMany(() => FoodEntity, (foods) => foods.user, {
    nullable: true,
    cascade: true,
  })
  foods?: FoodEntity[];

  @Field((type) => GroupEntity, { nullable: true })
  @ManyToOne(() => GroupEntity, (group) => group.users)
  group?: GroupEntity;

  @Field((type) => [UserEntity], { nullable: true })
  @OneToMany(() => UserEntity, (subUser) => subUser.superUser, {
    nullable: true,
    cascade: true,
  })
  subUsers?: UserEntity[];

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (superUser) => superUser.subUsers)
  superUser?: UserEntity;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Field((type) => Boolean)
  @Column('boolean', { default: false })
  verified: boolean;

  @Field((type) => Int)
  @Column({ default: UserStatusEnum.ACTIVE })
  status: number;

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
    username,
    adresse,
    dialCode,
    phoneNumber,
    country,
    city,
    gender,
    posLat,
    posLng,
  ) {
    this.id = id;
    this.fullname = fullname;
    this.username = username;
    this.adresse = adresse;
    this.dialCode = dialCode;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.city = city;
    this.gender = gender;
    this.posLat = posLat;
    this.posLng = posLng;
  }
}
