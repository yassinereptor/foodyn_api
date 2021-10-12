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
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { ImageEntity } from 'src/image/entities/image.entity';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { RecordEntity } from 'src/record/entities/record.entity';
import { TokenEntity } from 'src/token/entities/token.entity';
import { UserTypeEnum } from '../types/user-type.enum';
import { EateryEntity } from 'src/eatery/entities/eatery.entity';

@ObjectType('User')
@Entity('users')
export class UserEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column()
  type: UserTypeEnum;

  @Field((type) => ProfileEntity, { nullable: true })
  @OneToOne(() => ProfileEntity, { nullable: true, cascade: true })
  @JoinColumn()
  profile?: ProfileEntity;

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
}
