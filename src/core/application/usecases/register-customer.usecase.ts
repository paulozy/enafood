import { Customer } from '@domain/entities/customer.entity';
import { HasherGateway } from '@domain/gateways/hasher.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerAlreadyExistsError } from './@errors/customer-already-exists-error';

export type RegisterCustomerInput = {
  name: string;
  email: string;
  plainTextPassword: string;
};

export class RegisterCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly hasher: HasherGateway,
  ) {}

  async execute(data: RegisterCustomerInput) {
    const { name, email, plainTextPassword } = data;

    const hasCustomer = await this.customerRepository.exists(email);

    if (hasCustomer) {
      throw new CustomerAlreadyExistsError(email);
    }

    const hashedPassword = await this.hasher.hash(plainTextPassword);

    const customer = Customer.create({ name, email, password: hashedPassword });

    await this.customerRepository.create(customer);

    return customer;
  }
}
