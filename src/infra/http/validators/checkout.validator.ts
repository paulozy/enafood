import { ClassValidatorFields } from '@shared/infra/http/validators/class-validator-fields';
import { CheckoutRules } from '../dtos/checkout.dto';

export class CheckoutValidator extends ClassValidatorFields<CheckoutRules> {
  validate(data: CheckoutRules) {
    return super.validate(new CheckoutRules(data));
  }
}

export class CheckoutValidatorFactory {
  static create() {
    return new CheckoutValidator();
  }
}
