import { CustomerUseCases } from '@core/application/factories/customer-usecases.factory';
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, CustomerUseCases],
})
export class HttpModule {}
