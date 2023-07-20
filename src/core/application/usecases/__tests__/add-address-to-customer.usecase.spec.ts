import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { AddAddressToCustomerUseCase } from '../add-address-to-customer.usecase';
import { makeCustomer } from './factories/customer-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Add Address to Customer UseCase', () => {
  let usecase: AddAddressToCustomerUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;

  const payload = {
    street: 'Rua A',
    number: '123',
    district: 'Bairro A',
    city: 'Cidade A',
    state: 'Estado A',
    country: 'País A',
    zipCode: '12345678',
  };

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    customerRepository.save(customer);

    usecase = new AddAddressToCustomerUseCase(customerRepository);
  });

  it('should be possible add a address to customer', async () => {
    await usecase.execute({
      customerId: customer.id,
      ...payload,
    });

    expect(customer.addresses.length).toBe(1);
    expect(customer.addresses[0].street).toBe(payload.street);
    expect(customer.addresses[0].number).toBe(payload.number);
    expect(customer.addresses[0].district).toBe(payload.district);
    expect(customer.addresses[0].city).toBe(payload.city);
    expect(customer.addresses[0].state).toBe(payload.state);
    expect(customer.addresses[0].country).toBe(payload.country);
    expect(customer.addresses[0].zipCode).toBe(payload.zipCode);
  });

  it('should not be possible add a address to customer if customer not found', async () => {
    await expect(
      usecase.execute({
        customerId: 'invalid-customer-id',
        ...payload,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });
});
