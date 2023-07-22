import { ProductRepository } from '@domain/repositories/product-repository.interface';

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    return this.productRepository.list();
  }
}
