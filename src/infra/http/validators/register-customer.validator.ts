import { ClassValidatorFields } from '@shared/infra/http/validators/class-validator-fields';
import { RegisterCustomerRules } from '../dtos/register-customer.dto';

export class RegisterCustomerValidator extends ClassValidatorFields<RegisterCustomerRules> {
  validate(data: RegisterCustomerRules): boolean {
    return super.validate(new RegisterCustomerRules(data));
  }
}

export class RegisterCustomerValidatorFactory {
  static create(): RegisterCustomerValidator {
    return new RegisterCustomerValidator();
  }
}
