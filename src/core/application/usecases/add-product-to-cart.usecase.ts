import { Cart } from '@domain/entities/cart.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';
import { ProductNotFoundError } from './@errors/product-not-found-error';
import { ProductQuantityNotEnoughError } from './@errors/product-quantity-not-enough-error';

type CartProduct = {
  id: string;
  quantity: number;
};

type CreateCartInput = {
  customerId: string;
  item: CartProduct;
};

export class AddProductToCartUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(data: CreateCartInput): Promise<Cart> {
    const { customerId, item } = data;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const product = await this.productRepository.findById(item.id);

    if (!product) {
      throw new ProductNotFoundError(item.id);
    }

    if (product.quantity < item.quantity) {
      throw new ProductQuantityNotEnoughError(product.quantity);
    }

    const cart = customer.cart;

    cart.addProduct(product, item.quantity);
    await this.customerRepository.save(customer);

    return cart;
  }
}
