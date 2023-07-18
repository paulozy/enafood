import { BaseEntity } from '@shared/domain/entities/base.entity';

enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
}

type PaymentProps = {
  id?: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  createdAt?: number;
  updatedAt?: number;
};

export class Payment extends BaseEntity {
  private _paymentMethod: string;
  private _cardNumber: string;

  private constructor({
    id,
    paymentMethod,
    cardNumber,
    createdAt,
    updatedAt,
  }: PaymentProps) {
    super({ id, createdAt, updatedAt });

    this._paymentMethod = paymentMethod;
    this._cardNumber = cardNumber;
  }

  static create(props: PaymentProps): Payment {
    return new Payment(props);
  }

  get paymentMethod(): string {
    return this._paymentMethod;
  }

  get cardNumber(): string {
    return this._cardNumber;
  }
}
