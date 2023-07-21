import { ClassValidatorFields } from '@shared/infra/http/validators/class-validator-fields';
import { AddAddressRules } from '../dtos/add-addres.dto';

export class AddAddressValidator extends ClassValidatorFields<AddAddressRules> {
  validate(data: AddAddressRules) {
    return super.validate(new AddAddressRules(data));
  }
}

export class AddAddressValidatorFactory {
  static create() {
    return new AddAddressValidator();
  }
}
