import { Body, Controller, Post } from '@nestjs/common';
import { RegisterCustomerRules } from '../dtos/register-customer.dto';
import { BadRequest } from '../http-responses';
import { CustomerService } from '../services/customer.service';
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
}
