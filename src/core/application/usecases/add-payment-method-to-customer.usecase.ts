import { Payment, PaymentMethod } from '@domain/entities/payment.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';
import { InvalidPaymentMethodError } from './@errors/invalid-payment-method-error';

export type AddPaymentMethodToCustomerInput = {
  customerId: string;
  method: string;
  cardNumber: string;
};

export class AddPaymentMethodToCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: AddPaymentMethodToCustomerInput) {
    const { customerId, method, cardNumber } = data;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const paymentMethod = Payment.create({
      paymentMethod: this.getPaymentMethod(method),
      cardNumber,
    });

    customer.addPaymentMethod(paymentMethod);

    await this.customerRepository.save(customer);

    return customer;
  }

  private getPaymentMethod(method: string): PaymentMethod {
    switch (method) {
      case 'credit_card':
        return PaymentMethod.CREDIT_CARD;
      case 'debit_card':
        return PaymentMethod.DEBIT_CARD;
      default:
        throw new InvalidPaymentMethodError(method);
    }
  }
}
