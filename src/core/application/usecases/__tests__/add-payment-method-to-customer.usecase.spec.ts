import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { InvalidPaymentMethodError } from '../@errors/invalid-payment-method-error';
import { AddPaymentMethodToCustomerUseCase } from '../add-payment-method-to-customer.usecase';
import { makeCustomer } from './factories/customer-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Add Payment Method to Customer UseCase', () => {
  let usecase: AddPaymentMethodToCustomerUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;
  let payload;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    customerRepository.create(customer);

    payload = {
      customerId: customer.id,
      method: 'credit_card',
      cardNumber: '1234567890123456',
    };

    usecase = new AddPaymentMethodToCustomerUseCase(customerRepository);
  });

  it('should be possible add a payment method to customer', async () => {
    const response = await usecase.execute(payload);

    expect(response).toBeDefined();
    expect(response.paymentMethods).toHaveLength(1);
    expect(response.paymentMethods[0].paymentMethod).toBe('credit_card');
    expect(response.paymentMethods[0].cardNumber).toBe('1234567890123456');
  });

  it('should be possible add a debit card payment method to customer', async () => {
    const response = await usecase.execute({
      ...payload,
      method: 'debit_card',
    });

    expect(response).toBeDefined();
    expect(response.paymentMethods).toHaveLength(1);
    expect(response.paymentMethods[0].paymentMethod).toBe('debit_card');
    expect(response.paymentMethods[0].cardNumber).toBe('1234567890123456');
  });

  it('should not be possible add a payment method to a non-existent customer', async () => {
    await expect(
      usecase.execute({ ...payload, customerId: 'invalid-customer-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should not be possible add a payment method with an invalid method', async () => {
    await expect(
      usecase.execute({ ...payload, method: 'invalid-method' }),
    ).rejects.toBeInstanceOf(InvalidPaymentMethodError);
  });
});
