import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { CreateCartUseCase } from '../add-product-to-cart.usecase';
import { makeCustomer } from './factories/customer-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';

describe('Create Cart UseCase', () => {
  let usecase: CreateCartUseCase;
  let customerRepository: CustomerRepository;
  let productRepository: ProductRepository;

  let customer: Customer;
  const productInfo = {
    id: '71b5f21f-0c4a-4b3f-9cb6-50e51fcd44ee',
    name: 'Product A',
    quantity: 5,
    price: 10.99,
    createdAt: 1626740400000,
    updatedAt: 1626740400000,
  };

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});

    customerRepository.save(customer);

    usecase = new CreateCartUseCase(productRepository, customerRepository);
  });

  it('should be possible add a product to cart', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      item: {
        id: productInfo.id,
        quantity: 1,
      },
    });

    expect(cart).toBeDefined();
    expect(cart.products.length).toBe(1);
    expect(cart.products[0].id).toBe(productInfo.id);
    expect(cart.products[0].quantity).toBe(1);
  });

  it('should be possible add a product to cart and decrease product quantity', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      item: {
        id: productInfo.id,
        quantity: 1,
      },
    });

    const product = await productRepository.findById(productInfo.id);

    expect(cart).toBeDefined();
    expect(cart.products.length).toBe(1);
    expect(cart.products[0].id).toBe(productInfo.id);
    expect(cart.products[0].quantity).toBe(1);
    expect(product.quantity).toBe(4);
  });

  it('should be possible add a product to cart and increase cart total', async () => {
    const cart = await usecase.execute({
      customerId: customer.id,
      item: {
        id: productInfo.id,
        quantity: 1,
      },
    });

    expect(cart).toBeDefined();
    expect(cart.total).toBe(10.99);
  });
});
