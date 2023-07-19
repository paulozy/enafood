import { BaseEntity } from '@shared/domain/entities/base.entity';

type ProductProps = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  createdAt?: number;
  updatedAt?: number;
};

export class Product extends BaseEntity {
  private _name: string;
  private _price: number;
  private _quantity: number;

  private constructor({
    id,
    name,
    price,
    createdAt,
    quantity,
    updatedAt,
  }: ProductProps) {
    super({ id, createdAt, updatedAt });

    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  static create(props: ProductProps): Product {
    return new Product(props);
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  decreaseQuantity(quantity: number): void {
    this._quantity -= quantity;
  }
}
