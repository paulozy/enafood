import {
  PaymentGateway,
  PaymentResponse,
} from '@domain/gateways/payment.gateway';
import { randomUUID as uuid } from 'node:crypto';

enum PaymentStatus {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

const possibleReasons = [
  'Insufficient funds',
  'Invalid card number',
  'Invalid CVC',
];

export class InMemoryPaymentGateway implements PaymentGateway {
  async pay(): Promise<PaymentResponse> {
    const randomNum = Math.floor(Math.random() * 10);

    if (randomNum % 2 === 0) {
      return this.approvePayment();
    }

    return this.declinePayment();
  }

  private async approvePayment(): Promise<PaymentResponse> {
    const payment = {
      id: uuid(),
      status: PaymentStatus.APPROVED,
    };

    return payment;
  }

  private async declinePayment(): Promise<PaymentResponse> {
    const reason =
      possibleReasons[Math.floor(Math.random() * possibleReasons.length)];

    const payment = {
      id: uuid(),
      status: PaymentStatus.DECLINED,
      reason,
    };

    return payment;
  }
}
