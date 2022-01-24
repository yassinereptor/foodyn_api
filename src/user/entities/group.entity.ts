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
  ManyToMany,
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
import { UserEntity } from './user.entity';
import { RuleEntity } from './rule.entity';

@ObjectType('Group')
@Entity('groups')
export class GroupEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => [RuleEntity], { nullable: true })
  @ManyToMany(() => RuleEntity, (rule) => rule.groupes)
  rules?: RuleEntity[];

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.groups, { nullable: true })
  @JoinColumn()
  user?: UserEntity;

  @Field((type) => [UserEntity], { nullable: true })
  @OneToMany(() => UserEntity, (user) => user.group, {
    nullable: true,
    cascade: true,
  })
  users?: UserEntity[];

  @Field()
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
