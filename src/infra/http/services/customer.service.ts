import { CustomerUseCasesInterface } from '@core/application/factories/customer-usecases.factory';
import { AddAddressToCustomerInput } from '@core/application/usecases/add-address-to-customer.usecase';
import { AddPaymentMethodToCustomerInput } from '@core/application/usecases/add-payment-method-to-customer.usecase';
import { RegisterCustomerInput } from '@core/application/usecases/register-customer.usecase';
import { RemovePaymentMethodFromCustomerInput } from '@core/application/usecases/remove-payment-method-from-customer.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { BadRequest, Conflict, InternalServerError } from '../http-responses';
import { CustomerViewModel } from '../view-models/customer-view-model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerUseCases')
    private readonly customerUseCases: CustomerUseCasesInterface,
  ) {}

  async register(data: RegisterCustomerInput) {
    try {
      const { register } = this.customerUseCases;

      const customer = await register.execute(data);

      return CustomerViewModel.toHttp(customer);
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerAlreadyExistsError':
          throw new Conflict(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }

  async addPaymentMethod(data: AddPaymentMethodToCustomerInput) {
    try {
      const { addPaymentMethod } = this.customerUseCases;

      const customer = await addPaymentMethod.execute(data);

      return CustomerViewModel.toHttp(customer);
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new Conflict(error.message);
        case 'InvalidPaymentMethodError':
          throw new BadRequest(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }

  async removePaymentMethod(data: RemovePaymentMethodFromCustomerInput) {
    try {
      const { removePaymentMethod } = this.customerUseCases;

      const customer = await removePaymentMethod.execute(data);

      return CustomerViewModel.toHttp(customer);
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new Conflict(error.message);
        case 'PaymentMethodNotFoundError':
          throw new BadRequest(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }

  async addAddress(data: AddAddressToCustomerInput) {
    try {
      const { addAddress } = this.customerUseCases;

      const customer = await addAddress.execute(data);

      return CustomerViewModel.toHttp(customer);
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new Conflict(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }
}
