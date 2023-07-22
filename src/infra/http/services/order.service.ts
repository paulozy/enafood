import { OrderUseCases } from '@core/application/factories/order-usecases.factory';
import { ListCustomerOrdersInput } from '@core/application/usecases/list-customer-orders.usecase';
import { ShowOrderInput } from '@core/application/usecases/show-order.usecase';
import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError, NotFound } from '../http-responses';
import { OrderViewModel } from '../view-models/order-view-model';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderUseCases')
    private readonly orderUseCases: OrderUseCases,
  ) {}

  async listCustomerOrders(data: ListCustomerOrdersInput) {
    try {
      const { listCustomerOrders } = this.orderUseCases;

      const orders = await listCustomerOrders.execute(data);

      return {
        orders: orders.map((order) => OrderViewModel.toHttp(order)),
      };
    } catch (error) {
      switch (error.constructor.name) {
        case 'CustomerNotFoundError':
          throw new NotFound(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }

  async showOrder(data: ShowOrderInput) {
    try {
      const { showOrder } = this.orderUseCases;

      const order = await showOrder.execute(data);

      return OrderViewModel.toHttp(order);
    } catch (error) {
      switch (error.constructor.name) {
        case 'OrderNotFoundError':
          throw new NotFound(error.message);
        default:
          throw new InternalServerError();
      }
    }
  }
}
