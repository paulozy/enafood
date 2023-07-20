import { BaseEntity } from '@shared/domain/entities/base.entity';
import { Address } from './address.entity';
import { Cart } from './cart.entity';
import { Payment } from './payment.entity';

type CustomerProps = {
  id?: string;
  name: string;
  email: string;
  password: string;
  cart?: Cart;
  paymentMethods?: Payment[];
  addressess?: Address[];
  createdAt?: number;
  updatedAt?: number;
};

export class Customer extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _paymentMethods: Payment[];
  private _addressess: Address[];
  private _cart: Cart;

  private constructor({
    id,
    name,
    email,
    password,
    cart,
    paymentMethods,
    addressess,
    createdAt,
    updatedAt,
  }: CustomerProps) {
    super({ id, createdAt, updatedAt });

    this._name = name;
    this._email = email;
    this._password = password;
    this._paymentMethods = paymentMethods ?? [];
    this._cart = cart ?? Cart.create({});
    this._addressess = addressess ?? [];
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

  get cart(): Cart {
    return this._cart;
  }

  get addressess(): Address[] {
    return this._addressess;
  }

  addPaymentMethod(payment: Payment): void {
    this._paymentMethods.push(payment);
  }

  removePaymentMethod(payment: Payment): void {
    this._paymentMethods = this._paymentMethods.filter(
      (p) => p.id !== payment.id,
    );
  }

  addAddress(address: Address): void {
    this._addressess.push(address);
  }

  removeAddress(address: Address): void {
    this._addressess = this._addressess.filter((a) => a.id !== address.id);
  }
}
