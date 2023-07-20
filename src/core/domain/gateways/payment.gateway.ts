import { Payment } from '@domain/entities/payment.entity';

export type CheckoutInput = {
  value: number;
  paymentMethod: Payment;
  CVC: string;
};

export type PaymentResponse = {
  id: string;
  status: string;
  reason?: string;
};

export abstract class PaymentGateway {
  abstract pay(input: CheckoutInput): Promise<PaymentResponse>;
}
