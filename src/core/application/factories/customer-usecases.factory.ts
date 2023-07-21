import { HasherGateway } from '@domain/gateways/hasher.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { RegisterCustomerUseCase } from '../usecases/register-customer.usecase';

export interface CustomerUseCasesInterface {
  register: RegisterCustomerUseCase;
}

export const CustomerUseCases = {
  provide: 'CustomerUseCases',
  useFactory: (
    customerRepository: CustomerRepository,
    hasher: HasherGateway,
  ) => ({
    register: new RegisterCustomerUseCase(customerRepository, hasher),
  }),
  inject: [CustomerRepository, HasherGateway],
};
