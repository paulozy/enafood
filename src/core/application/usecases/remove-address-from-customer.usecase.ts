import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

export type RemoveAddressFromCustomerInput = {
  customerId: string;
  addressId: string;
};

export class RemoveAddressFromCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({ customerId, addressId }: RemoveAddressFromCustomerInput) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    customer.removeAddress(addressId);

    await this.customerRepository.save(customer);

    return customer;
  }
}
