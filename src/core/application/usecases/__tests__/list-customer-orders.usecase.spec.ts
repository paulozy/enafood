import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { ListCustomerOrdersUseCase } from '../list-customer-orders.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makeOrder } from './factories/order-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryOrderRepository } from './repositories/in-memory-order-repository';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';

describe('List Customer Orders UseCase', () => {
  let usecase: ListCustomerOrdersUseCase;
  let orderRepository: OrderRepository;
  let customerRepository: CustomerRepository;

  let customer: Customer;

  beforeEach(async () => {
    orderRepository = new InMemoryOrderRepository();
    customerRepository = new InMemoryCustomerRepository();

    const productRepository = new InMemoryProductRepository();
    const products = await productRepository.list();

    customer = makeCustomer({});
    customer.cart.addProduct(products[0], 1);
    customer.cart.addProduct(products[1], 1);

    const order = makeOrder({
      customerId: customer.id,
      products: customer.cart.products,
      total: customer.cart.total,
    });

    customerRepository.create(customer);
    orderRepository.save(order);

    usecase = new ListCustomerOrdersUseCase(
      orderRepository,
      customerRepository,
    );
  });

  it('should list customer orders', async () => {
    const orders = await usecase.execute({ customerId: customer.id });

    expect(orders).toHaveLength(1);
  });

  it('should throw CustomerNotFoundError if customer does not exist', async () => {
    await expect(
      usecase.execute({ customerId: 'non-existent-customer-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should return empty array if customer does not have orders', async () => {
    const customerWithoutOrders = makeCustomer({});
    customerRepository.create(customerWithoutOrders);

    const orders = await usecase.execute({
      customerId: customerWithoutOrders.id,
    });

    expect(orders).toHaveLength(0);
  });
});
