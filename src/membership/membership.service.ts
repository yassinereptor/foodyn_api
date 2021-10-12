import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from './entities/membership.entity';

@Injectable()
export class MembershipService {
    constructor(
        @InjectRepository(MembershipEntity)
        private membershipsRepository: Repository<MembershipEntity>,
    ) { }

    findAllMemberships(): Promise<MembershipEntity[]> {
        return this.membershipsRepository.find({ relations: ['coupon', 'plan', 'user'] });
    }

    findAllMembershipsByIds(ids: number[]): Promise<MembershipEntity[]> {
        return this.membershipsRepository.find({ where: { id: ids }, relations: ['coupon', 'plan', 'user'] });
    }

    findOneMembershipById(id: number): Promise<MembershipEntity> {
        return this.membershipsRepository.findOne(id, { relations: ['coupon', 'plan', 'user'] });
    }

    async insertOrUpdateMembership(newMembership: MembershipEntity): Promise<MembershipEntity> {
        return this.membershipsRepository.save(newMembership);
    }

    async deleteMembership(id: string): Promise<void> {
        await this.membershipsRepository.softDelete(id);
    }

    async recoverMembership(id: string): Promise<void> {
        var membership = await this.membershipsRepository.findOne(id);
        await this.membershipsRepository.recover(membership);
    }
}
