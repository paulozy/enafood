import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError, NotFound } from '../http-responses';
import { CartViewModel } from '../view-models/cart-view-model';

@Injectable()
export class CartService {
  constructor(
    @Inject('CartUseCases')
    private readonly cartUseCases: CartUseCases,
  ) {}

  async show(customerId: string) {
    try {
      const { show } = this.cartUseCases;

      const cart = await show.execute({ customerId });

      return CartViewModel.toHttp(cart);
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
