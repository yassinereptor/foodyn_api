import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Mutation,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { GetRecordArgs } from './dto/args/get-record.args';
import { GetRecordsArgs } from './dto/args/get-records.args';
import { InsertOrUpdateRecordInput } from './dto/input/insert-or-update-record.input';
import { RecordEntity } from './entities/record.entity';
import { RecordService } from './record.service';

@Resolver()
export class RecordResolver {
  constructor(private readonly recordsService: RecordService) {}

  @Query(() => RecordEntity, { name: 'record', nullable: true })
  @UseGuards(GqlAuthGuard)
  getRecord(@Args() getRecordArgs: GetRecordArgs): Promise<RecordEntity> {
    return this.recordsService.findOneRecordById(getRecordArgs.id);
  }

  @Query(() => [RecordEntity], { name: 'records', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  getRecords(@Args() getRecordsArgs: GetRecordsArgs): Promise<RecordEntity[]> {
    return this.recordsService.findAllRecordsByIds(getRecordsArgs.ids);
  }

  @Mutation(() => RecordEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateRecord(
    @CurrentUser() user: UserEntity,
    @Args('record') insertOrUpdateRecordInput: InsertOrUpdateRecordInput,
  ): Promise<RecordEntity> {
    return this.recordsService.insertOrUpdateRecord(
      user.id,
      new RecordEntity(
        insertOrUpdateRecordInput.status,
        insertOrUpdateRecordInput.country,
        insertOrUpdateRecordInput.countryCode,
        insertOrUpdateRecordInput.region,
        insertOrUpdateRecordInput.regionName,
        insertOrUpdateRecordInput.city,
        insertOrUpdateRecordInput.zip,
        insertOrUpdateRecordInput.lat,
        insertOrUpdateRecordInput.lon,
        insertOrUpdateRecordInput.timezone,
        insertOrUpdateRecordInput.isp,
        insertOrUpdateRecordInput.org,
        insertOrUpdateRecordInput.operator,
        insertOrUpdateRecordInput.query,
      ),
    );
  }
}
