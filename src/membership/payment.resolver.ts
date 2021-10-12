import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetPaymentArgs } from './dto/args/get-payment.args';
import { InsertOrUpdatePaymentInput } from './dto/input/insert-or-update-payment.input';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentsService: PaymentService) {}

  @Query(() => PaymentEntity, { name: 'payment', nullable: true })
  @UseGuards(GqlAuthGuard)
  getPayment(@Args() getPaymentArgs: GetPaymentArgs): Promise<PaymentEntity> {
    return this.paymentsService.findOnePaymentById(getPaymentArgs.id);
  }

  @Query(() => [PaymentEntity], { name: 'payments', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getPayments(): Promise<PaymentEntity[]> {
    return this.paymentsService.findAllPayments();
  }

  @Mutation(() => PaymentEntity)
  @UseGuards(GqlAuthGuard)
  insertOrUpdatePayment(
    @Args('payment') insertOrUpdatePaymentInput: InsertOrUpdatePaymentInput,
  ): Promise<PaymentEntity> {
    return this.paymentsService.insertOrUpdatePayment(
      new PaymentEntity(
        insertOrUpdatePaymentInput.id,
        insertOrUpdatePaymentInput.type,
        insertOrUpdatePaymentInput.title,
        insertOrUpdatePaymentInput.description,
        insertOrUpdatePaymentInput.asset,
        insertOrUpdatePaymentInput.primaryColor,
        insertOrUpdatePaymentInput.accentColor,
        insertOrUpdatePaymentInput.textColor
      ),
    );
  }
}
