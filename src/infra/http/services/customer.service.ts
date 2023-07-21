import { CustomerUseCasesInterface } from '@core/application/factories/customer-usecases.factory';
import { AddPaymentMethodToCustomerInput } from '@core/application/usecases/add-payment-method-to-customer.usecase';
import { RegisterCustomerInput } from '@core/application/usecases/register-customer.usecase';
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
      console.log(error);

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
}
