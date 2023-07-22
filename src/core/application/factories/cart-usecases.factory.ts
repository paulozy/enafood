import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { AddProductToCartUseCase } from '../usecases/add-product-to-cart.usecase';
import { DecreaseProductQuantityFromCartUseCase } from '../usecases/decrease-product-quantity-from-cart.usecase';
import { RemoveProductFromCartUseCase } from '../usecases/remove-product-from-cart.usecase';
import { ShowCartUseCase } from '../usecases/show-cart.usecase';

export interface CartUseCases {
  show: ShowCartUseCase;
  addProduct: AddProductToCartUseCase;
  removeProduct: RemoveProductFromCartUseCase;
  decreaseProductQuantity: DecreaseProductQuantityFromCartUseCase;
}

export const CartUseCases = {
  provide: 'CartUseCases',
  useFactory: (
    customerRepository: CustomerRepository,
    productRepository: ProductRepository,
  ) => ({
    show: new ShowCartUseCase(customerRepository),
    addProduct: new AddProductToCartUseCase(
      productRepository,
      customerRepository,
    ),
    removeProduct: new RemoveProductFromCartUseCase(customerRepository),
    decreaseProductQuantity: new DecreaseProductQuantityFromCartUseCase(
      customerRepository,
    ),
  }),
  inject: [CustomerRepository, ProductRepository],
};
