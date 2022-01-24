import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupEntity } from './entities/group.entity';
import { UserEntity } from './entities/user.entity';
import { UserTypeEnum } from './types/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(GroupEntity)
    private groupsRepository: Repository<GroupEntity>,
  ) {}

  findAllUsersByIds(ids: number[]): Promise<UserEntity[]> {
    return this.usersRepository.find({
      where: { id: ids },
      relations: ['records', 'tokens', 'images', 'image', 'memberships'],
    });
  }

  findOneUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne(id, {
      relations: ['records', 'tokens', 'images', 'image', 'memberships'],
    });
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['records', 'tokens', 'images', 'image', 'memberships'],
    });
  }

  async insertUser(
    email: string,
    password: string,
    type: UserTypeEnum,
  ): Promise<UserEntity> {
    var newUser = this.usersRepository.create({ email, password, type });
    newUser = await this.usersRepository.save(newUser);
    if (type == UserTypeEnum.USER)
    {
      var group = this.groupsRepository.create({
        user: newUser,
        title: "SuperUser"
      })
      await this.groupsRepository.save(group);
    }
    return newUser;
  }

  async updateUser(
    user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  async updateUserById(
    userId: number,
    newUser: UserEntity,
  ): Promise<UserEntity> {
    var user = await this.usersRepository.findOne(userId);
    user.fullname = newUser.fullname;
    user.username = newUser.username;
    user.adresse = newUser.adresse;
    user.dialCode = newUser.dialCode;
    user.phoneNumber = newUser.phoneNumber;
    user.country = newUser.country;
    user.city = newUser.city;
    user.gender = newUser.gender;
    user.posLat = newUser.posLat;
    user.posLng = newUser.posLng;
    return this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async recoverUser(id: string): Promise<void> {
    var user = await this.usersRepository.findOne(id);
    await this.usersRepository.recover(user);
  }
}
