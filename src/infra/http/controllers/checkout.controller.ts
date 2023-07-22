import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckoutRules } from '../dtos/checkout.dto';
import { BadRequest } from '../http-responses';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutValidatorFactory } from '../validators/checkout.validator';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post(':id')
  async checkout(@Param('id') customerId: string, @Body() data: CheckoutRules) {
    const validator = CheckoutValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new BadRequest(validator.errors);
    }

    return this.checkoutService.checkout({
      customerId,
      CVC: data.CVC,
      paymentMethodId: data.paymentMethodId,
    });
  }
}
