import { ProductUseCases } from '@core/application/factories/product-usecases.factory';
import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError } from '../http-responses';
import { ProductViewModel } from '../view-models/product-view-model';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductUseCases')
    private readonly productUseCases: ProductUseCases,
  ) {}

  async listProducts() {
    try {
      const { listProducts } = this.productUseCases;

      const products = await listProducts.execute();

      return {
        products: products.map((product) => ProductViewModel.toHttp(product)),
      };
    } catch (error) {
      switch (error.constructor.name) {
        default:
          throw new InternalServerError();
      }
    }
  }
}
