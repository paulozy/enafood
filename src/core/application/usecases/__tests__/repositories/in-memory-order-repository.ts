import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order-repository.interface';

export class InMemoryOrderRepository implements OrderRepository {
  orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findById(id: string): Promise<Order> {
    return this.orders.find((order) => order.id === id);
  }

  async findByCustomerId(userId: string): Promise<Order[]> {
    return this.orders.filter((order) => order.customerId === userId);
  }
}
