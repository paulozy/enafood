import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

export type ShowCustomerInput = {
  customerId: string;
};

export class ShowCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute({ customerId }: ShowCustomerInput) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const orders = await this.orderRepository.findByCustomerId(customerId);

    return {
      customer,
      orders,
    };
  }
}
