import { BaseEntity } from '@shared/domain/entities/base.entity';
import { Product } from './product.entity';

type CartProduct = {
  id: string;
  quantity: number;
  price: number;
};

type CartProps = {
  id?: string;
  products?: CartProduct[];
  total?: number;
  createdAt?: number;
  updatedAt?: number;
};

export class Cart extends BaseEntity {
  private _products: CartProduct[];
  private _total: number;

  private constructor({
    id,
    products,
    total,
    createdAt,
    updatedAt,
  }: CartProps) {
    super({ id, createdAt, updatedAt });
    this._products = products ?? [];
    this._total = total ?? 0;
  }

  static create(props: CartProps): Cart {
    return new Cart(props);
  }

  get products(): CartProduct[] {
    return this._products;
  }

  get total(): number {
    return this._total;
  }

  addProduct(product: Product, quantity: number): void {
    const hasProduct = this._products.find((p) => p.id === product.id);

    if (hasProduct) {
      hasProduct.quantity += quantity;
      this.calculateTotal();
      return;
    }

    this._products.push({
      id: product.id,
      quantity,
      price: product.price,
    });

    this.calculateTotal();
  }

  removeProduct(productId: string): void {
    this._products = this._products.filter(
      (product) => product.id !== productId,
    );
    this.calculateTotal();
  }

  decreaseProductQuantity(productId: string): void {
    const product = this._products.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    product.quantity -= 1;

    if (product.quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    this.calculateTotal();
  }

  increaseProductQuantity(productId: string): void {
    const product = this._products.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    product.quantity += 1;
    this.calculateTotal();
  }

  clear(): void {
    this._products = [];
    this._total = 0;
  }

  private calculateTotal(): void {
    this._total = this._products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );
  }
}
