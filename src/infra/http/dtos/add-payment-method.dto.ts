import { IsNotEmpty, IsString } from 'class-validator';

export class AddPaymentMethodRules {
  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  constructor(props: AddPaymentMethodRules) {
    Object.assign(this, props);
  }
}
