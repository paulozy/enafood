import { Product } from '@domain/entities/product.entity';

export abstract class ProductRepository {
  abstract exists(id: string): Promise<boolean>;
  abstract save(id: string, name: string, price: number): Promise<void>;
  abstract list(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | undefined>;
  abstract findByName(name: string): Promise<Product | undefined>;
  abstract delete(id: string): Promise<void>;
}
