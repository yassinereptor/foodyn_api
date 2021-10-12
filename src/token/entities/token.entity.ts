import { TokenStatusEnum } from '../status/token-status.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { TokenTypeEnum } from '../types/token-type.enum';

@ObjectType('Token')
@Entity('tokens')
export class TokenEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.tokens)
  user?: UserEntity;

  @Field((type) => Int)
  @Column()
  type: TokenTypeEnum;

  @Field()
  @Column()
  token: string;

  @Field((type) => Int)
  @Column({ default: TokenStatusEnum.ACTIVE })
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
