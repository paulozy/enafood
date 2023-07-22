import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckoutRules {
  @ApiProperty({
    nullable: false,
    description: 'Payment method ID',
    example: 'pm_1JbJ1t2eZvKYlo2C3X2X2X2X',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty({
    nullable: false,
    description: 'Card number',
    example: '4242424242424242',
  })
  @IsString()
  @IsNotEmpty()
  CVC: string;

  constructor(props: CheckoutRules) {
    Object.assign(this, props);
  }
}
