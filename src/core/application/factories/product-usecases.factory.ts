import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { ListProductsUseCase } from '../usecases/list-products.usecase';

export interface ProductUseCases {
  listProducts: ListProductsUseCase;
}

export const ProductUseCases = {
  provide: 'ProductUseCases',
  useFactory: (productRepository: ProductRepository) => ({
    listProducts: new ListProductsUseCase(productRepository),
  }),
  inject: [ProductRepository],
};
