import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':customerId')
  async listCustomerOrders(@Param('customerId') customerId: string) {
    return this.orderService.listCustomerOrders({ customerId });
  }

  @Get('/:customerId/:orderId')
  async showOrder(@Param('orderId') orderId: string) {
    return this.orderService.showOrder({
      id: orderId,
    });
  }
}
