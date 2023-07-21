import { Customer } from '@domain/entities/customer.entity';
import { PaymentGateway } from '@domain/gateways/payment.gateway';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { CustomerNotFoundError } from '../@errors/customer-not-found-error';
import { CheckoutUseCase } from '../checkout.usecase';
import { makeCustomer } from './factories/customer-factory';
import { makePayment } from './factories/payment-factory';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryOrderRepository } from './repositories/in-memory-order-repository';
import { InMemoryPaymentGateway } from './repositories/in-memory-payment-gateway';
import { InMemoryProductRepository } from './repositories/in-memory-product-repository';

describe('Checkout UseCase', () => {
  let usecase: CheckoutUseCase;
  let orderRepository: OrderRepository;
  let customerRepository: CustomerRepository;
  let productRepository: ProductRepository;
  let paymentGateway: PaymentGateway;

  let customer: Customer;
  let products;
  let payload;

  beforeEach(async () => {
    orderRepository = new InMemoryOrderRepository();
    customerRepository = new InMemoryCustomerRepository();
    productRepository = new InMemoryProductRepository();
    paymentGateway = new InMemoryPaymentGateway();

    products = await productRepository.list();

    customer = makeCustomer({});
    const paymentMethod = makePayment({});
    customer.addPaymentMethod(paymentMethod);

    customer.cart.addProduct(products[0], 1);
    customer.cart.addProduct(products[1], 1);

    customerRepository.create(customer);

    payload = {
      CVC: '123',
      customerId: customer.id,
      paymentMethodId: paymentMethod.id,
    };

    usecase = new CheckoutUseCase(
      orderRepository,
      customerRepository,
      productRepository,
      paymentGateway,
    );
  });

  it('should create an order', async () => {
    jest.spyOn(paymentGateway, 'pay').mockResolvedValue({
      id: 'valid-id',
      status: 'APPROVED',
    });

    const checkout = await usecase.execute(payload);
    const order = await orderRepository.findById(checkout.orderId);

    expect(checkout).toHaveProperty('orderId');
    expect(order).toBeDefined();
    expect(order.customerId).toBe(customer.id);
    expect(customer.cart.total).toBe(0);
    expect(customer.cart.products).toHaveLength(0);
  });

  it('should update the stock of products', async () => {
    jest.spyOn(paymentGateway, 'pay').mockResolvedValue({
      id: 'valid-id',
      status: 'APPROVED',
    });

    const checkout = await usecase.execute(payload);

    const products1 = await productRepository.findById(products[0].id);
    const products2 = await productRepository.findById(products[1].id);

    expect(checkout).toHaveProperty('orderId');
    expect(products1.quantity).toBe(3);
    expect(products2.quantity).toBe(8);
  });

  it('should throw an error if customer does not exist', async () => {
    jest.spyOn(paymentGateway, 'pay').mockResolvedValue({
      id: 'valid-id',
      status: 'APPROVED',
    });

    const checkout = usecase.execute({
      ...payload,
      customerId: 'invalid-id',
    });

    await expect(checkout).rejects.toBeInstanceOf(CustomerNotFoundError);
  });

  it('should return paymentResponse declined if payment is declined', async () => {
    jest.spyOn(paymentGateway, 'pay').mockResolvedValue({
      id: 'valid-id',
      status: 'DECLINED',
      reason: 'Insufficient funds',
    });

    const checkout = await usecase.execute(payload);

    expect(checkout).toHaveProperty('status', 'DECLINED');
    expect(checkout).toHaveProperty('reason', 'Insufficient funds');
  });
});
