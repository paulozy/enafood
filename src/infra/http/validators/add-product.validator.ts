import { ClassValidatorFields } from '@shared/infra/http/validators/class-validator-fields';
import { AddProductRules } from '../dtos/add-product.dto';

export class AddProductValidator extends ClassValidatorFields<AddProductRules> {
  validate(data: AddProductRules) {
    return super.validate(new AddProductRules(data));
  }
}

export class AddProductValidatorFactory {
  static create() {
    return new AddProductValidator();
  }
}
