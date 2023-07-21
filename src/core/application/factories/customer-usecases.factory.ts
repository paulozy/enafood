import { HasherGateway } from '@domain/gateways/hasher.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { AddAddressToCustomerUseCase } from '../usecases/add-address-to-customer.usecase';
import { AddPaymentMethodToCustomerUseCase } from '../usecases/add-payment-method-to-customer.usecase';
import { RegisterCustomerUseCase } from '../usecases/register-customer.usecase';
import { RemoveAddressFromCustomerUseCase } from '../usecases/remove-address-from-customer.usecase';
import { RemovePaymentMethodFromCustomerUseCase } from '../usecases/remove-payment-method-from-customer.usecase';

export interface CustomerUseCasesInterface {
  register: RegisterCustomerUseCase;
  addAddress: AddAddressToCustomerUseCase;
  removeAddress: RemoveAddressFromCustomerUseCase;
  addPaymentMethod: AddPaymentMethodToCustomerUseCase;
  removePaymentMethod: RemovePaymentMethodFromCustomerUseCase;
}

export const CustomerUseCases = {
  provide: 'CustomerUseCases',
  useFactory: (
    customerRepository: CustomerRepository,
    hasher: HasherGateway,
  ) => ({
    register: new RegisterCustomerUseCase(customerRepository, hasher),
    addAddress: new AddAddressToCustomerUseCase(customerRepository),
    removeAddress: new RemoveAddressFromCustomerUseCase(customerRepository),
    addPaymentMethod: new AddPaymentMethodToCustomerUseCase(customerRepository),
    removePaymentMethod: new RemovePaymentMethodFromCustomerUseCase(
      customerRepository,
    ),
  }),
  inject: [CustomerRepository, HasherGateway],
};
