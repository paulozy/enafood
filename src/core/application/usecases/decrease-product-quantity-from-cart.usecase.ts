import { Cart } from '@domain/entities/cart.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

export type DecreaseProductQuantityFromCartInput = {
  customerId: string;
  productId: string;
};

export class DecreaseProductQuantityFromCartUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: DecreaseProductQuantityFromCartInput): Promise<Cart> {
    const { customerId, productId } = data;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const cart = customer.cart;

    cart.decreaseProductQuantity(productId);

    await this.customerRepository.save(customer);

    return cart;
  }
}
