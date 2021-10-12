import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType('Record')
@Entity('records')
export class RecordEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => UserEntity, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.records, { nullable: true })
  @JoinColumn()
  user?: UserEntity;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  countryCode: string;

  @Field()
  @Column()
  region: string;

  @Field()
  @Column()
  regionName: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  zip: string;

  @Field((type) => Float)
  @Column('float')
  lat: number;

  @Field((type) => Float)
  @Column('float')
  lon: number;

  @Field()
  @Column()
  timezone: string;

  @Field()
  @Column()
  isp: string;

  @Field()
  @Column()
  org: string;

  @Field()
  @Column()
  operator: string;

  @Field()
  @Column()
  query: string;

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
    status: string,
    country: string,
    countryCode: string,
    region: string,
    regionName: string,
    city: string,
    zip: string,
    lat: number,
    lon: number,
    timezone: string,
    isp: string,
    org: string,
    operator: string,
    query: string,
  ) {
    this.status = status;
    this.country = country;
    this.countryCode = countryCode;
    this.region = region;
    this.regionName = regionName;
    this.city = city;
    this.zip = zip;
    this.lat = lat;
    this.lon = lon;
    this.timezone = timezone;
    this.isp = isp;
    this.org = org;
    this.operator = operator;
    this.query = query;
  }
}
