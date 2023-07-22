import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { OrderNotFoundError } from './@errors/order-not-found-error';

export type ShowOrderInput = {
  id: string;
};

export class ShowOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute({ id }: ShowOrderInput) {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }
}
