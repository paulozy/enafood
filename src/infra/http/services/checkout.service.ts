import { CheckoutUseCases } from '@core/application/factories/checkout-usecases.factory';
import { CheckoutInput } from '@core/application/usecases/checkout.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError, NotFound } from '../http-responses';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject('CheckoutUseCases')
    private readonly checkoutUseCases: CheckoutUseCases,
  ) {}

  async checkout(data: CheckoutInput) {
    try {
      const { checkout } = this.checkoutUseCases;

      const payment = await checkout.execute(data);

      return payment;
    } catch (error) {
      console.log(error);

      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new NotFound(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }
}
