import { ObjectType, Int, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MembershipEntity } from 'src/membership/entities/membership.entity';
import { SectionEntity } from './section.entity';
import { IsNumber } from 'class-validator';

@ObjectType('Table')
@Entity('tables')
export class TableEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => SectionEntity, { nullable: true })
  @ManyToOne(() => SectionEntity, (section) => section.tables)
  section?: SectionEntity;

  @Field((type) => Int)
  @IsNumber()
  @Column()
  number: number;

  @Field((type) => Int)
  @IsNumber()
  @Column()
  row: number;

  @Field((type) => Int)
  @IsNumber()
  @Column()
  column: number;

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
    number,
    row,
    column
  ) {
    this.id = id,
    this.number = number,
    this.row = row,
    this.column = column
  }
}
