import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { GetProfileArgs } from './dto/args/get-profile.args';
import { GetProfilesArgs } from './dto/args/get-profiles.args';
import { InsertOrUpdateProfileInput } from './dto/input/insert-or-update-profile.input';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profilesService: ProfileService) {}

  @Query(() => ProfileEntity, { name: 'profile', nullable: true })
  @UseGuards(GqlAuthGuard)
  getProfile(@Args() getProfileArgs: GetProfileArgs): Promise<ProfileEntity> {
    return this.profilesService.findOneProfileById(getProfileArgs.id);
  }

  @Query(() => ProfileEntity, { name: 'currentProfile', nullable: true })
  @UseGuards(GqlAuthGuard)
  getCurrentProfile(
    @CurrentUser() user: UserEntity,
  ): Promise<ProfileEntity> {
    return this.profilesService.findOneProfileById(user.id);
  }

  @Query(() => [ProfileEntity], { name: 'profiles', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  getProfiles(
    @Args() getProfilesArgs: GetProfilesArgs,
  ): Promise<ProfileEntity[]> {
    return this.profilesService.findAllProfilesByIds(getProfilesArgs.ids);
  }

  @Mutation(() => ProfileEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdateProfile(
    @CurrentUser() user: UserEntity,
    @Args('profile') insertOrUpdateProfileInput: InsertOrUpdateProfileInput,
  ): Promise<ProfileEntity> {
    return this.profilesService.insertOrUpdateProfile(
      user.id,
      new ProfileEntity(
        insertOrUpdateProfileInput.id,
        insertOrUpdateProfileInput.fullname,
        insertOrUpdateProfileInput.adresse,
        insertOrUpdateProfileInput.dialCode,
        insertOrUpdateProfileInput.phoneNumber,
        insertOrUpdateProfileInput.country,
        insertOrUpdateProfileInput.city,
        insertOrUpdateProfileInput.zipCode,
        insertOrUpdateProfileInput.gender,
        insertOrUpdateProfileInput.posLat,
        insertOrUpdateProfileInput.posLng,
      ),
    );
  }
}
