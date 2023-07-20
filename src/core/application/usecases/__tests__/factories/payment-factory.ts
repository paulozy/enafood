import { Payment, PaymentMethod } from '@domain/entities/payment.entity';

type Payload = {
  cardNumber?: string;
  paymentMethod?: PaymentMethod;
};

export const makePayment = (payload: Payload) => {
  return Payment.create({
    cardNumber: payload.cardNumber ?? '1234567890123456',
    paymentMethod: payload.paymentMethod ?? PaymentMethod.CREDIT_CARD,
  });
};
