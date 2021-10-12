import { Injectable, Query } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { GetProfileArgs } from './dto/args/get-profile.args';
import { GetProfilesArgs } from './dto/args/get-profiles.args';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profilesRepository: Repository<ProfileEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllProfilesByIds(ids: number[]): Promise<ProfileEntity[]> {
    return this.profilesRepository.find({
      where: { id: ids },
      relations: ['user', 'image'],
    });
  }

  findOneProfileById(id: number): Promise<ProfileEntity> {
    return this.profilesRepository.findOne(id, {
      relations: ['user', 'image'],
    });
  }

  findOneProfileByUser(user: UserEntity): Promise<ProfileEntity> {
    return this.profilesRepository.findOne({
      where: { user },
      relations: ['user', 'image'],
    });
  }

  async insertOrUpdateProfile(
    userId: number,
    newProfile: ProfileEntity,
  ): Promise<ProfileEntity> {
    var user = await this.usersRepository.findOne(userId, {relations: ["profile"]});
    newProfile.user = user;
    if (user.profile == null)
    {
      var profile = await this.profilesRepository.save(newProfile);
      user.profile = profile;
      await this.usersRepository.save(user);
      return profile;
    }
    var oldProfile = await this.profilesRepository.findOne(user.profile.id);
    oldProfile.fullname = newProfile.fullname;
    oldProfile.adresse = newProfile.adresse;
    oldProfile.dialCode = newProfile.dialCode;
    oldProfile.phoneNumber = newProfile.phoneNumber;
    oldProfile.country = newProfile.country;
    oldProfile.city = newProfile.city;
    oldProfile.zipCode = newProfile.zipCode;
    oldProfile.gender = newProfile.gender;
    oldProfile.posLat = newProfile.posLat;
    oldProfile.posLng = newProfile.posLng;
    return this.profilesRepository.save(oldProfile);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.profilesRepository.softDelete(id);
  }

  async recoverProfile(id: string): Promise<void> {
    var user = await this.profilesRepository.findOne(id);
    await this.profilesRepository.recover(user);
  }
}
