import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { ListCustomerOrdersUseCase } from '../usecases/list-customer-orders.usecase';
import { ShowOrderUseCase } from '../usecases/show-order.usecase';

export interface OrderUseCases {
  listCustomerOrders: ListCustomerOrdersUseCase;
  showOrder: ShowOrderUseCase;
}

export const OrderUseCases = {
  provide: 'OrderUseCases',
  useFactory: (
    orderRepository: OrderRepository,
    customerRepository: CustomerRepository,
  ) => ({
    listCustomerOrders: new ListCustomerOrdersUseCase(
      orderRepository,
      customerRepository,
    ),
    showOrder: new ShowOrderUseCase(orderRepository),
  }),
  inject: [OrderRepository, CustomerRepository],
};
