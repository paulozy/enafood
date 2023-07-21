import { CustomerUseCasesInterface } from '@core/application/factories/customer-usecases.factory';
import { RegisterCustomerInput } from '@core/application/usecases/register-customer.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { Conflict, InternalServerError } from '../http-responses';
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
}
