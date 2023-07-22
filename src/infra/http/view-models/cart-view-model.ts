import { Cart } from '@prisma/client';

export class CartViewModel {
  static toHttp(cart: Cart) {
    return {
      items: cart.products,
      total: cart.total,
    };
  }
}
