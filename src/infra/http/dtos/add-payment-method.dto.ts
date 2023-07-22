import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPaymentMethodRules {
  @ApiProperty({
    nullable: false,
    description: 'Payment method',
    example: 'credit_card',
  })
  @IsString()
  @IsNotEmpty()
  method: string;

  @ApiProperty({
    nullable: false,
    description: 'Card number',
    example: '1234 5678 9012 3456',
  })
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  constructor(props: AddPaymentMethodRules) {
    Object.assign(this, props);
  }
}
