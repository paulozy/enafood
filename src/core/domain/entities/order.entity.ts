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
  private _total: number;

  private constructor({
    id,
    products,
    total,
    createdAt,
    updatedAt,
  }: OrderProps & { total: number }) {
    super({ id, createdAt, updatedAt });

    this._products = products;
    this._total = total;
  }

  static create(props: OrderProps): Order {
    const total = Order.calculateTotal(props.products);

    return new Order({
      ...props,
      total,
    });
  }

  static calculateTotal(products: Product[]): number {
    return products.reduce((acc, curr) => acc + curr.price, 0);
  }

  get total(): number {
    return this._total;
  }

  get products(): Product[] {
    return this._products;
  }

  addProduct(product: Product): void {
    this._products.push(product);
    this._total = Order.calculateTotal(this._products);
  }
}
