import { Order } from '@domain/entities/order.entity';

export class OrderViewModel {
  static toHttp(order: Order) {
    return {
      id: order.id,
      customerId: order.customerId,
      products: order.products,
      total: order.total,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
