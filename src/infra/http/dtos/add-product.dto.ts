import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductRules {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  constructor(props: AddProductRules) {
    Object.assign(this, props);
  }
}
