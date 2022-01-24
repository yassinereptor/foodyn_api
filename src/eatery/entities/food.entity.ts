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

@ObjectType('Food')
@Entity('foods')
export class FoodEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.foods)
  user?: UserEntity;

  @Field()
  @IsString()
  @Column()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  description?: string;

  @Field((type) => [ImageEntity], { nullable: true })
  @OneToMany(() => ImageEntity, (image) => image.food, {
    nullable: true,
    cascade: true,
  })
  images?: ImageEntity[];

  @Field((type) => Float, { nullable: true })
  @IsLatitude()
  @Column('float', { nullable: true })
  rate?: number;
  
  @Field({ nullable: true })
  @IsString()
  @Column({ nullable: true })
  price?: string;

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
