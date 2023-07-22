import { Controller, Get } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listProducts() {
    return this.productService.listProducts();
  }
}
