import { Address } from '@domain/entities/address.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

type AddAddressToCustomerInput = {
  customerId: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export class AddAddressToCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(data: AddAddressToCustomerInput): Promise<void> {
    const customer = await this.customerRepository.findById(data.customerId);

    if (!customer) {
      throw new CustomerNotFoundError(data.customerId);
    }

    const address = Address.create({
      ...data,
    });

    customer.addAddress(address);

    await this.customerRepository.save(customer);
  }
}
