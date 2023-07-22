import { Order } from '@domain/entities/order.entity';
import { Order as RawOrder } from '@prisma/client';

export class OrderMapper {
  static toPersistence(order: Order): RawOrder {
    return {
      id: order.id,
      customerId: order.customerId,
      products: order.products,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toDomain(raw: RawOrder): Order {
    return Order.create({
      id: raw.id,
      customerId: raw.customerId,
      products: raw.products,
      total: raw.total,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
