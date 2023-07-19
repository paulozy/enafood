import { Product } from '@domain/entities/product.entity';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { products } from '@shared/utils/products';

export class InMemoryProductRepository implements ProductRepository {
  products: Product[] = products.map((p) => {
    return Product.create({
      ...p,
    });
  });

  async exists(id: string): Promise<boolean> {
    return this.products.some((p) => p.id === id);
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product> {
    return this.products.find((p) => p.id === id);
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find((p) => p.name === name);
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
