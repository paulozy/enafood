import { Product } from '@domain/entities/product.entity';

type Payload = {
  name?: string;
  quantity?: number;
  price?: number;
};

export const makeProduct = (data: Payload) => {
  return Product.create({
    name: data.name ?? 'Product A',
    quantity: data.quantity ?? 5,
    price: data.price ?? 10.99,
  });
};
