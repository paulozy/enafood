import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from '../services/cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  async show(@Param('id') customerId: string) {
    return this.cartService.show(customerId);
  }
}
