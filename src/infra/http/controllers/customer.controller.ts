import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddPaymentMethodRules } from '../dtos/add-payment-method.dto';
import { RegisterCustomerRules } from '../dtos/register-customer.dto';
import { BadRequest } from '../http-responses';
import { CustomerService } from '../services/customer.service';
import { AddPaymentMethodValidatorFactory } from '../validators/add-payment-method.validator';
import { RegisterCustomerValidatorFactory } from '../validators/register-customer.validator';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async register(@Body() body: RegisterCustomerRules) {
    const validator = RegisterCustomerValidatorFactory.create();
    const isValid = validator.validate(body);

    if (!isValid) {
      throw new BadRequest(validator.errors);
    }

    return this.customerService.register({
      ...body,
      plainTextPassword: body.password,
    });
  }

  @Post(':id/payment_methods')
  async addPaymentMethod(
    @Param('id') customerId: string,
    @Body() body: AddPaymentMethodRules,
  ) {
    const validator = AddPaymentMethodValidatorFactory.create();
    const isValid = validator.validate(body);

    if (!isValid) {
      throw new BadRequest(validator.errors);
    }

    return this.customerService.addPaymentMethod({
      customerId,
      ...body,
    });
  }
}
