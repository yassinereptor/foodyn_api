import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserTypeEnum } from './types/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllUsersByIds(ids: number[]): Promise<UserEntity[]> {
    return this.usersRepository.find({
      where: { id: ids },
      relations: ['profile', 'records', 'tokens', 'images', 'memberships'],
    });
  }

  findOneUserById(id: number): Promise<UserEntity> {
    return this.usersRepository.findOne(id, {
      relations: ['profile', 'records', 'tokens', 'images', 'memberships'],
    });
  }

  findUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['profile', 'records', 'tokens', 'images', 'memberships'],
    });
  }

  updateUser(user: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  insertUser(
    email: string,
    password: string,
    type: UserTypeEnum,
  ): Promise<UserEntity> {
    const newUser = this.usersRepository.create({ email, password, type });
    return this.usersRepository.save(newUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async recoverUser(id: string): Promise<void> {
    var user = await this.usersRepository.findOne(id);
    await this.usersRepository.recover(user);
  }
}
