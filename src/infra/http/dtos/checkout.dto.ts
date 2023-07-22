import { IsNotEmpty, IsString } from 'class-validator';

export class CheckoutRules {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsString()
  @IsNotEmpty()
  CVC: string;

  constructor(props: CheckoutRules) {
    Object.assign(this, props);
  }
}
