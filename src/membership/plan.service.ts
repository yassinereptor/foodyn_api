import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEntity } from '../membership/entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private plansRepository: Repository<PlanEntity>,
  ) {}

  findAllPlans(): Promise<PlanEntity[]> {
    return this.plansRepository.find({ relations: ['memberships'] });
  }

  findAllPlansByIds(ids: number[]): Promise<PlanEntity[]> {
    return this.plansRepository.find({
      where: { id: ids },
      relations: ['memberships'],
    });
  }

  findOnePlanById(id: number): Promise<PlanEntity> {
    return this.plansRepository.findOne(id, { relations: ['memberships'] });
  }

  async insertOrUpdatePlan(newPlan: PlanEntity): Promise<PlanEntity> {
    return this.plansRepository.save(newPlan);
  }

  async deletePlan(id: string): Promise<void> {
    await this.plansRepository.softDelete(id);
  }

  async recoverPlan(id: string): Promise<void> {
    var plan = await this.plansRepository.findOne(id);
    await this.plansRepository.recover(plan);
  }
}
