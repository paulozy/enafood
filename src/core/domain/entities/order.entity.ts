import { BaseEntity } from '@shared/domain/entities/base.entity';

type OrderProduct = {
  productId: string;
  quantity: number;
};

type OrderProps = {
  id?: string;
  customerId: string;
  products: OrderProduct[];
  total: number;
  createdAt?: number;
  updatedAt?: number;
};

export class Order extends BaseEntity {
  private _products: OrderProduct[];
  private _total: number;

  private constructor({
    id,
    products,
    total,
    createdAt,
    updatedAt,
  }: OrderProps) {
    super({ id, createdAt, updatedAt });
    this._products = products;
    this._total = total;
  }

  static create(props: OrderProps): Order {
    return new Order(props);
  }

  get products(): OrderProduct[] {
    return this._products;
  }

  get total(): number {
    return this._total;
  }
}
