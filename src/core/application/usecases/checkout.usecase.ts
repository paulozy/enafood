import { Order } from '@domain/entities/order.entity';
import { PaymentGateway } from '@domain/gateways/payment.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { CustomerNotFoundError } from './@errors/customer-not-found-error';

type CheckoutInput = {
  customerId: string;
  paymentMethodId: string;
  CVC: string;
};

type CheckoutOutput = {
  status: string;
  reason?: string;
  orderId?: string;
};

export class CheckoutUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly productRepository: ProductRepository,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  public async execute({
    customerId,
    paymentMethodId,
    CVC,
  }: CheckoutInput): Promise<CheckoutOutput> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new CustomerNotFoundError(customerId);
    }

    const cart = customer.cart;
    const products = cart.products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    const paymentMethod = customer.getPaymentMethod(paymentMethodId);

    const paymentResponse = await this.paymentGateway.pay({
      value: cart.total,
      paymentMethod: paymentMethod,
      CVC,
    });

    if (paymentResponse.status === 'DECLINED') {
      return paymentResponse;
    }

    const order = Order.create({
      customerId,
      products,
      total: cart.total,
    });

    cart.clear();

    await this.orderRepository.save(order);
    await this.productRepository.updateStockMany(products);

    return {
      status: paymentResponse.status,
      orderId: order.id,
    };
  }
}
