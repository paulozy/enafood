import { Product } from '@domain/entities/product.entity';
import {
  ProductRepository,
  UpdateStockInput,
} from '@domain/repositories/product-repository.interface';
import { products } from '@shared/utils/products';

const mappedProducts = products.map((product) => Product.create(product));

export class InMemoryProductRepository implements ProductRepository {
  products: Product[] = mappedProducts;

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

  async updateStockMany(products: UpdateStockInput[]): Promise<void> {
    products.forEach((product) => {
      const productIndex = this.products.findIndex(
        (p) => p.id === product.productId,
      );

      if (productIndex >= 0) {
        this.products[productIndex].decreaseQuantity(product.quantity);
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
