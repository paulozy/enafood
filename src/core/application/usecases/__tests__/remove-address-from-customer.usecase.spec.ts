import { Address } from '@domain/entities/address.entity';
import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { RemoveAddressFromCustomerUseCase } from '../remove-address-from-customer.usecase';
import { makeAddress } from './factories/address-factory';
import { makeCustomer } from './factories/customer-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';

describe('Remove Address From Customer UseCase', () => {
  let usecase: RemoveAddressFromCustomerUseCase;
  let customerRepository: CustomerRepository;

  let customer: Customer;
  let address: Address;

  beforeEach(() => {
    customerRepository = new InMemoryCustomerRepository();

    customer = makeCustomer({});
    address = makeAddress({});
    customer.addAddress(address);

    customerRepository.save(customer);

    usecase = new RemoveAddressFromCustomerUseCase(customerRepository);
  });

  it('should be possible remove a address from customer', async () => {
    await usecase.execute({
      customerId: customer.id,
      addressId: address.id,
    });

    const customerFound = await customerRepository.findById(customer.id);

    expect(customerFound.addresses).toHaveLength(0);
  });

  it('should not be possible remove a address from customer if customer does not exists', async () => {
    await expect(
      usecase.execute({
        customerId: 'invalid-customer-id',
        addressId: address.id,
      }),
    ).rejects.toBeInstanceOf(CustomerNotFoundError);
  });
});
