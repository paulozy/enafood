import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [PrismaService, CustomerRepository],
})
export class DatabaseModule {}
