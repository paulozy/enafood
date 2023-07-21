import { Customer } from '@domain/entities/customer.entity';
import { Payment } from '@domain/entities/payment.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { PaymentMethodNotFoundError } from '../@errors/payment-method-not-found-error';
import { RemovePaymentMethodFromCustomerUseCase } from '../remove-payment-method-from-customer.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makePayment } from './factories/payment-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Remove Payment Method From Customer UseCase', () => {
  let usecase: RemovePaymentMethodFromCustomerUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;
  let paymentMethod: Payment;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    paymentMethod = makePayment({});
    customer.addPaymentMethod(paymentMethod);
    customerRepository.create(customer);

    usecase = new RemovePaymentMethodFromCustomerUseCase(customerRepository);
  });

  it('should be possible remove a payment method from customer', async () => {
    const response = await usecase.execute({
      customerId: customer.id,
      paymentId: paymentMethod.id,
    });

    expect(response).toBeDefined();
    expect(response.paymentMethods).toHaveLength(0);
  });

  it('should not be possible remove a payment method from a non-existing customer', async () => {
    await expect(
      usecase.execute({
        customerId: 'non-existing-customer-id',
        paymentId: paymentMethod.id,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should not be possible remove a non-existing payment method from customer', async () => {
    await expect(
      usecase.execute({
        customerId: customer.id,
        paymentId: 'non-existing-payment-method-id',
      }),
    ).rejects.toBeInstanceOf(PaymentMethodNotFoundError);
  });
});
