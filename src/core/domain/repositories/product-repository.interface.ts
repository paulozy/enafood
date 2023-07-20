import { Product } from '@domain/entities/product.entity';

export type UpdateStockInput = {
  productId: string;
  quantity: number;
};

export abstract class ProductRepository {
  abstract exists(id: string): Promise<boolean>;
  abstract save(product: Product): Promise<void>;
  abstract updateStockMany(products: UpdateStockInput[]): Promise<void>;
  abstract list(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | undefined>;
  abstract findByName(name: string): Promise<Product | undefined>;
  abstract delete(id: string): Promise<void>;
}
