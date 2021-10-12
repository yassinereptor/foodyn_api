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
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { EateryEntity } from './eatery.entity';

@ObjectType('EateryType')
@Entity('eaterytype')
export class EateryTypeEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [EateryEntity], { nullable: true })
  @ManyToMany(() => EateryEntity, (eatery) => eatery.eateryTypes, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  eateries?: EateryEntity[];

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @Field((type) => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;

  constructor(title) {
    this.title = title;
  }
}
