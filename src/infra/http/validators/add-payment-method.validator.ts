import { ClassValidatorFields } from '@shared/infra/http/validators/class-validator-fields';
import { AddPaymentMethodRules } from '../dtos/add-payment-method.dto';

export class AddPaymentMethodValidator extends ClassValidatorFields<AddPaymentMethodRules> {
  validate(data: AddPaymentMethodRules): boolean {
    return super.validate(new AddPaymentMethodRules(data));
  }
}

export class AddPaymentMethodValidatorFactory {
  static create(): AddPaymentMethodValidator {
    return new AddPaymentMethodValidator();
  }
}
