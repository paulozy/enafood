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
  private _customerId: string;
  private _products: OrderProduct[];
  private _total: number;

  private constructor({
    id,
    customerId,
    products,
    total,
    createdAt,
    updatedAt,
  }: OrderProps) {
    super({ id, createdAt, updatedAt });
    this._products = products;
    this._total = total;
    this._customerId = customerId;
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

  get customerId(): string {
    return this._customerId;
  }
}
