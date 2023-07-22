import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddAddressRules {
  @ApiProperty({
    nullable: false,
    description: 'Street name',
    example: 'Rua um',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    nullable: false,
    description: 'Street number',
    example: '123',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    nullable: true,
    description: 'Complement',
    example: 'Casa 1',
  })
  @IsString()
  complement?: string;

  @ApiProperty({
    nullable: false,
    description: 'District',
    example: 'Morumbi',
  })
  @IsString()
  @IsNotEmpty()
  district: string;

  @ApiProperty({
    nullable: false,
    description: 'City',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    nullable: false,
    description: 'State',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    nullable: false,
    description: 'Country',
    example: 'Brasil',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    nullable: false,
    description: 'Zip code',
    example: '12345-678',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  constructor(props: AddAddressRules) {
    Object.assign(this, props);
  }
}
