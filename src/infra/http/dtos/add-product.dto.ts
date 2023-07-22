import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductRules {
  @ApiProperty({
    nullable: false,
    description: 'Product id',
    example: '1234',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    nullable: false,
    description: 'Product quantity',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  constructor(props: AddProductRules) {
    Object.assign(this, props);
  }
}
