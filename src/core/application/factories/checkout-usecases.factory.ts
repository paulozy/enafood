import { PaymentGateway } from '@domain/gateways/payment.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { CheckoutUseCase } from '../usecases/checkout.usecase';

export interface CheckoutUseCases {
  checkout: CheckoutUseCase;
}

export const CheckoutUseCases = {
  provide: 'CheckoutUseCases',
  useFactory: (
    customerRepository: CustomerRepository,
    productRepository: ProductRepository,
    orderRepository: OrderRepository,
    paymentGateway: PaymentGateway,
  ) => ({
    checkout: new CheckoutUseCase(
      orderRepository,
      customerRepository,
      productRepository,
      paymentGateway,
    ),
  }),
  inject: [
    CustomerRepository,
    ProductRepository,
    OrderRepository,
    PaymentGateway,
  ],
};
