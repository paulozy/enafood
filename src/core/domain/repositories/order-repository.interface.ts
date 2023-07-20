import { Order } from '@domain/entities/order.entity';

export abstract class OrderRepository {
  abstract save(order: Order): Promise<void>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findByCustomerId(userId: string): Promise<Order[]>;
}
