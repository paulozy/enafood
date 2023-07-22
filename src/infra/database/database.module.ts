import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { ProductRepository } from '@domain/repositories/product-repository.interface';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';
import { PrismaOrderRepository } from './prisma/repositories/prisma-order-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-product-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
    {
      provide: OrderRepository,
      useClass: PrismaOrderRepository,
    },
  ],
  exports: [
    PrismaService,
    CustomerRepository,
    ProductRepository,
    OrderRepository,
  ],
})
export class DatabaseModule {}
