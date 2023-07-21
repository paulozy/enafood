import { CustomerRepository } from '@core/domain/repositories/customer-repository.interface';
import { Customer } from '@domain/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { CustomerMapper } from '../mappers/costumer-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(email: string): Promise<boolean> {
    const consumer = await this.prisma.customer.findFirst({
      where: { email },
    });

    return !!consumer;
  }

  async create(customer: Customer): Promise<void> {
    const rawData = CustomerMapper.toPersistence(customer);

    await this.prisma.customer.create({
      data: rawData,
    });
  }

  async save(customer: Customer): Promise<void> {
    const rawData = CustomerMapper.toPersistence(customer);

    await this.prisma.customer.update({
      where: { id: customer.id },
      data: {
        name: rawData.name,
        email: rawData.email,
        password: rawData.password,
        cart: rawData.cart,
        paymentMethods: rawData.paymentMethods,
        addresses: rawData.addresses,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Customer> {
    const rawData = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!rawData) {
      return null;
    }

    return CustomerMapper.toDomain(rawData);
  }

  async findByEmail(email: string): Promise<Customer> {
    const rawData = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (!rawData) {
      return null;
    }

    return CustomerMapper.toDomain(rawData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: { id },
    });
  }
}
