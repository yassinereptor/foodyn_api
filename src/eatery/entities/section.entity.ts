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
import { EateryEntity } from './eatery.entity';
import { TableEntity } from './table.entity';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType('Section')
@Entity('sections')
export class SectionEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => EateryEntity, { nullable: true })
  @ManyToOne(() => EateryEntity, (eatery) => eatery.sections)
  eatery?: EateryEntity;

  @Field((type) => [TableEntity], { nullable: true })
  @OneToMany(() => TableEntity, (table) => table.section, {
    nullable: true,
    cascade: true,
  })
  tables?: TableEntity[];

  @Field()
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @Field((type) => Int)
  @IsNumber()
  @Column()
  rows: number;

  @Field((type) => Int)
  @IsNumber()
  @Column()
  columns: number;

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
    eatery,
    title,
    rows,
    columns
  ) {
    this.id = id; 
    this.eatery = eatery;
    this.title = title;
    this.rows = rows;
    this.columns = columns;
  }
}
