import { Order } from '@domain/entities/order.entity';

type Payload = {
  customerId: string;
  total: number;
  products: any[];
};

export const makeOrder = (data: Payload) => {
  return Order.create({
    customerId: data.customerId,
    products: data.products,
    total: data.total,
  });
};
