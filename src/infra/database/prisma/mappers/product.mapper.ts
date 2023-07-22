import { Product } from '@domain/entities/product.entity';
import { Product as RawProduct } from '@prisma/client';

export class ProductMapper {
  static toPersistence(product: Product): RawProduct {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toDomain(rawData: RawProduct): Product {
    return Product.create({
      id: rawData.id,
      name: rawData.name,
      price: rawData.price,
      quantity: rawData.quantity,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
    });
  }
}
