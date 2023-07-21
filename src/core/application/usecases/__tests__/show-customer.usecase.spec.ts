import { Customer } from '@domain/entities/customer.entity';
import { Order } from '@domain/entities/order.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { ShowCustomerUseCase } from '../show-customer.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makeProduct } from './factories/product-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryOrderRepository } from './repositories/in-memory-order-repository';

describe('Show Customer UseCase', () => {
  let usecase: ShowCustomerUseCase;
  let customerRepository: CustomerRepository;
  let orderRepository: OrderRepository;

  let customer: Customer;

  beforeEach(async () => {
    orderRepository = new InMemoryOrderRepository();
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});

    const product = makeProduct({});

    const order = Order.create({
      customerId: customer.id,
      products: [{ productId: product.id, quantity: 2 }],
      total: product.price * 2,
    });

    orderRepository.save(order);
    customerRepository.create(customer);
  });

  it('should return customer and orders', async () => {
    usecase = new ShowCustomerUseCase(customerRepository, orderRepository);

    const result = await usecase.execute({ customerId: customer.id });

    expect(result.customer).toEqual(customer);
    expect(result.orders).toHaveLength(1);
  });

  it('should throw CustomerNotFoundError if customer does not exist', async () => {
    usecase = new ShowCustomerUseCase(customerRepository, orderRepository);

    await expect(
      usecase.execute({ customerId: 'non-existing-customer-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should return empty order list if customer has no orders', async () => {
    jest.spyOn(orderRepository, 'findByCustomerId').mockResolvedValue([]);

    usecase = new ShowCustomerUseCase(customerRepository, orderRepository);

    const result = await usecase.execute({ customerId: customer.id });

    expect(result.orders).toHaveLength(0);
  });
});
