import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { AddAddressRules } from '../dtos/add-addres.dto';
import { AddPaymentMethodRules } from '../dtos/add-payment-method.dto';
import { RegisterCustomerRules } from '../dtos/register-customer.dto';
import { BadRequest } from '../http-responses';
import { CustomerService } from '../services/customer.service';
import { AddAddressValidatorFactory } from '../validators/add-addres.validator';
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

  @Delete(':id/payment_methods/:paymentId')
  async removePaymentMethod(
    @Param('id') customerId: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this.customerService.removePaymentMethod({
      customerId,
      paymentId,
    });
  }

  @Post(':id/addresses')
  async addAddress(
    @Param('id') customerId: string,
    @Body() body: AddAddressRules,
  ) {
    const validator = AddAddressValidatorFactory.create();
    const isValid = validator.validate(body);

    if (!isValid) {
      throw new BadRequest(validator.errors);
    }

    return this.customerService.addAddress({
      customerId,
      ...body,
    });
  }
}
