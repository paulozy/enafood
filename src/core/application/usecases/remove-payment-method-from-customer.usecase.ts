import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';
import { PaymentMethodNotFoundError } from './@errors/payment-method-not-found-error';

export type RemovePaymentMethodFromCustomerInput = {
  customerId: string;
  paymentId: string;
};

export class RemovePaymentMethodFromCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: RemovePaymentMethodFromCustomerInput) {
    const { customerId, paymentId } = data;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const paymentMethod = customer.getPaymentMethod(paymentId);

    if (!paymentMethod) {
      throw new PaymentMethodNotFoundError(paymentId);
    }

    customer.removePaymentMethod(paymentId);

    await this.customerRepository.save(customer);

    return customer;
  }
}
