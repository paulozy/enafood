import { BaseEntity } from '@shared/domain/entities/base.entity';
import { Product } from './product.entity';

type OrderProps = {
  id?: string;
  products: Product[];
  createdAt?: number;
  updatedAt?: number;
};

export class Order extends BaseEntity {
  private _products: Product[];

  private constructor({ id, products, createdAt, updatedAt }: OrderProps) {
    super({ id, createdAt, updatedAt });

    this._products = products;
  }

  static create(props: OrderProps): Order {
    return new Order(props);
  }

  static calculateTotal(products: Product[]): number {
    return products.reduce((acc, curr) => acc + curr.price, 0);
  }

  get total(): number {
    return this._products.reduce((acc, curr) => acc + curr.price, 0);
  }

  get products(): Product[] {
    return this._products;
  }

  addProduct(product: Product): void {
    this._products.push(product);
  }
}
