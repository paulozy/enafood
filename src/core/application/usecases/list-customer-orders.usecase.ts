import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

export type ListCustomerOrdersInput = {
  customerId: string;
};

export class ListCustomerOrdersUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute({ customerId }: ListCustomerOrdersInput) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    return this.orderRepository.findByCustomerId(customer.id);
  }
}
