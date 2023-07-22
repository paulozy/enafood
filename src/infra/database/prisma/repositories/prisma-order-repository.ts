import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order-repository.interface';
import { Injectable } from '@nestjs/common';
import { OrderMapper } from '../mappers/order-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: Order): Promise<void> {
    const rawData = OrderMapper.toPersistence(order);

    await this.prisma.order.create({
      data: rawData,
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    return OrderMapper.toDomain(order);
  }

  async findByCustomerId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        customerId: userId,
      },
    });

    return orders.map(OrderMapper.toDomain);
  }
}
