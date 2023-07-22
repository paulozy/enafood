import { Product } from '@domain/entities/product.entity';

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
