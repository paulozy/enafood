import { CartUseCases } from '@core/application/factories/cart-usecases.factory';
import { CustomerUseCases } from '@core/application/factories/customer-usecases.factory';
import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CustomerController } from './controllers/customer.controller';
import { CartService } from './services/cart.service';
import { CustomerService } from './services/customer.service';

@Module({
  controllers: [CustomerController, CartController],
  providers: [CustomerService, CustomerUseCases, CartService, CartUseCases],
})
export class HttpModule {}
