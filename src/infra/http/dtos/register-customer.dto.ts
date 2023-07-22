import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterCustomerRules {
  @ApiProperty({
    nullable: false,
    description: 'Customer name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    nullable: false,
    description: 'Customer email',
    example: 'john_doe@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'Customer password',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  constructor(props: RegisterCustomerRules) {
    Object.assign(this, props);
  }
}
