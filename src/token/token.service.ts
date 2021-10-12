// import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TokenTypeEnum } from './types/token-type.enum';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokensRepository: Repository<TokenEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAllTokensByIds(ids: number[]): Promise<TokenEntity[]> {
    return this.tokensRepository.find({
      where: { id: ids },
      relations: ['user'],
    });
  }

  findAllTokensByUser(user: UserEntity): Promise<TokenEntity[]> {
    return this.tokensRepository.find({
      where: { user: user },
      relations: ['user'],
    });
  }

  findOneTokenById(id: number): Promise<TokenEntity> {
    return this.tokensRepository.findOne(id, { relations: ['user'] });
  }

  findLastTokenOfType(userId: number, type: TokenTypeEnum): Promise<TokenEntity> {
    return this.tokensRepository.findOne({
      where: { userId, type },
      order: { id: 'DESC' },
      relations: ['user'],
    });
  }

  findOneTokenByToken(token: string): Promise<TokenEntity> {
    return this.tokensRepository.findOne({
      where: { token: token },
      relations: ['user'],
    });
  }

  updateToken(token: TokenEntity): Promise<TokenEntity> {
    return this.tokensRepository.save(token);
  }

  async insertToken(
    userId: number,
    token: string,
    type: TokenTypeEnum,
  ): Promise<TokenEntity> {
    var user = await this.usersRepository.findOne(userId);
    var newToken = this.tokensRepository.create({ user, token, type });
    return await this.tokensRepository.save(newToken);
  }

  async deleteToken(id: string): Promise<void> {
    await this.tokensRepository.softDelete(id);
  }

  async restoreUser(id: string): Promise<void> {
    await this.tokensRepository.restore(id);
  }
}
