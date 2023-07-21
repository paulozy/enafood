import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { ShowCartUseCase } from '../show-cart.usecase';
import { makeCustomer } from './factories/customer-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Show Cart UseCase', () => {
  let useCase: ShowCartUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    customerRepository.create(customer);

    useCase = new ShowCartUseCase(customerRepository);
  });

  it('should return the customer cart', async () => {
    const cart = await useCase.execute({ customerId: customer.id });

    expect(cart).toEqual(customer.cart);
  });

  it('should throw an error if the customer does not exist', async () => {
    await expect(
      useCase.execute({ customerId: 'invalid-customer-id' }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });
});
