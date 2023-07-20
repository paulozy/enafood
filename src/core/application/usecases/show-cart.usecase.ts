import { Cart } from '@domain/entities/cart.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

type ShowCartInput = {
  customerId: string;
};

export class ShowCartUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ customerId }: ShowCartInput): Promise<Cart> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    return customer.cart;
  }
}
