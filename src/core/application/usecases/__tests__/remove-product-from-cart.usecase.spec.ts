import { Customer } from '@domain/entities/customer.entity';
import { Product } from '@domain/entities/product.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { RemoveProductFromCartUseCase } from '../remove-product-from-cart.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makeProduct } from './factories/product-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('', () => {
  let usecase: RemoveProductFromCartUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;
  let product: Product;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    product = makeProduct({});
    customer.cart.addProduct(product, 1);

    customerRepository.create(customer);

    usecase = new RemoveProductFromCartUseCase(customerRepository);
  });

  it('should be possible remove a product from cart', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      productId: product.id,
    });

    expect(cart.products).toHaveLength(0);
  });

  it('should not be possible remove a product from cart if customer does not exist', async () => {
    await expect(
      usecase.execute({
        customerId: 'invalid-customer-id',
        productId: product.id,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should do nothing if product does not exist in cart', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      productId: 'invalid-product-id',
    });

    expect(cart.products).toHaveLength(1);
  });
});
