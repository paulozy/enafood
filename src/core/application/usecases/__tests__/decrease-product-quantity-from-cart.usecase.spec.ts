import { Customer } from '@domain/entities/customer.entity';
import { Product } from '@domain/entities/product.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { DecreaseProductQuantityFromCartUseCase } from '../decrease-product-quantity-from-cart.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makeProduct } from './factories/product-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Decrease Product Quantity From Cart UseCase', () => {
  let usecase: DecreaseProductQuantityFromCartUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;
  let product: Product;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    product = makeProduct({});
    customer.cart.addProduct(product, 2);

    customerRepository.save(customer);

    usecase = new DecreaseProductQuantityFromCartUseCase(customerRepository);
  });

  it('should decrease product quantity from cart', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      productId: product.id,
    });

    expect(cart.products).toHaveLength(1);
    expect(cart.products[0].quantity).toBe(1);
  });
});
