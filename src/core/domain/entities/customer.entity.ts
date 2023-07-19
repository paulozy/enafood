import { BaseEntity } from '@shared/domain/entities/base.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';

type CustomerProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  cart?: Cart;
  paymentMethods?: Payment[];
  orders?: Order[];
  createdAt?: number;
  updatedAt?: number;
};

export class Customer extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _paymentMethods: Payment[];
  private _orders: Order[];
  private _cart: Cart;

  private constructor({
    id,
    name,
    email,
    password,
    cart,
    orders,
    paymentMethods,
    createdAt,
    updatedAt,
  }: CustomerProps) {
    super({ id, createdAt, updatedAt });

    this._name = name;
    this._email = email;
    this._password = password;
    this._paymentMethods = paymentMethods ?? [];
    this._orders = orders ?? [];
    this._cart = cart ?? Cart.create({});
  }

  static create(props: CustomerProps): Customer {
    return new Customer(props);
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get paymentMethods(): Payment[] {
    return this._paymentMethods;
  }

  get orders(): Order[] {
    return this._orders;
  }

  get cart(): Cart {
    return this._cart;
  }

  addOrder(order: Order): void {
    this._orders.push(order);
  }

  addPaymentMethod(payment: Payment): void {
    this._paymentMethods.push(payment);
  }

  removePaymentMethod(payment: Payment): void {
    this._paymentMethods = this._paymentMethods.filter(
      (p) => p.id !== payment.id,
    );
  }
}
