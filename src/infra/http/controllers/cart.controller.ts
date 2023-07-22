import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddProductRules } from '../dtos/add-product.dto';
import { BadRequest } from '../http-responses';
import { CartService } from '../services/cart.service';
import { AddProductValidatorFactory } from '../validators/add-product.validator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async show(@Param('id') customerId: string) {
    return this.cartService.show(customerId);
  }

  @Post(':id/products')
  async addProduct(
    @Param('id') customerId: string,
    @Body() data: AddProductRules,
  ) {
    const validator = AddProductValidatorFactory.create();
    const isValid = validator.validate(data);

    if (!isValid) {
      throw new BadRequest(validator.errors);
    }

    return this.cartService.addProduct({ customerId, item: data });
  }

  @Delete(':id/products/:productId')
  async removeProduct(
    @Param('id') customerId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeProduct({ customerId, productId });
  }

  @Put(':id/products/:productId')
  async updateProductQuantity(
    @Param('id') customerId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.decreaseProductQuantity({
      customerId,
      productId,
    });
  }
}
