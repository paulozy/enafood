import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { OrderNotFoundError } from '../@errors/order-not-found-error';
import { ShowOrderUseCase } from '../show-order.usecase';
import { makeOrder } from './factories/order-factory';
import { InMemoryOrderRepository } from './repositories/in-memory-order-repository';

describe('Show Order UseCase', () => {
  let usecase: ShowOrderUseCase;
  let orderRepository: OrderRepository;

  let defaultOrder: Order;

  beforeEach(() => {
    orderRepository = new InMemoryOrderRepository();

    defaultOrder = makeOrder({
      customerId: 'customer-id',
      products: [],
      total: 0,
    });

    orderRepository.save(defaultOrder);

    usecase = new ShowOrderUseCase(orderRepository);
  });

  it('should show order', async () => {
    const order = await usecase.execute({ id: defaultOrder.id });

    expect(order).toEqual(order);
  });

  it('should throw OrderNotFoundError if order does not exist', async () => {
    await expect(
      usecase.execute({ id: 'non-existent-order-id' }),
    ).rejects.toBeInstanceOf(OrderNotFoundError);
  });
});
