import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { CreateCartInput } from '@core/application/usecases/add-product-to-cart.usecase';
import { RemoveProductFromCartInput } from '@core/application/usecases/remove-product-from-cart.usecase';
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

  async addProduct(data: CreateCartInput) {
    try {
      const { addProduct } = this.cartUseCases;

      const cart = await addProduct.execute(data);

      return CartViewModel.toHttp(cart);
    } catch (error) {
      console.log(error);

      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new NotFound(error.message);
        case 'ProductNotFoundError':
          throw new NotFound(error.message);
        case 'ProductQuantityNotEnoughError':
          throw new NotFound(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }

  async removeProduct(data: RemoveProductFromCartInput) {
    try {
      const { removeProduct } = this.cartUseCases;

      const cart = await removeProduct.execute(data);

      return CartViewModel.toHttp(cart);
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new NotFound(error.message);
        case 'ProductNotFoundError':
          throw new NotFound(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }
}
