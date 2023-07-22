import { Product } from '@domain/entities/product.entity';
import {
  ProductRepository,
  UpdateStockInput,
} from '@domain/repositories/product-repository.interface';
import { Injectable } from '@nestjs/common';
import { ProductMapper } from '../mappers/product.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(id: string): Promise<boolean> {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });

    return !!product;
  }

  async save(product: Product): Promise<void> {
    const rawData = ProductMapper.toPersistence(product);

    await this.prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: rawData.name,
        price: rawData.price,
        quantity: rawData.quantity,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      },
      create: {
        id: rawData.id,
        name: rawData.name,
        price: rawData.price,
        quantity: rawData.quantity,
        createdAt: rawData.createdAt,
        updatedAt: rawData.updatedAt,
      },
    });
  }

  async updateStockMany(products: UpdateStockInput[]): Promise<void> {
    products.forEach(async (product) => {
      await this.prisma.product.update({
        where: { id: product.productId },
        data: {
          quantity: {
            decrement: product.quantity,
          },
        },
      });
    });
  }

  async list(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { quantity: { gt: 0 } },
      orderBy: { createdAt: 'desc' },
    });

    return products.map(ProductMapper.toDomain);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    });

    if (!product) {
      return null;
    }

    return ProductMapper.toDomain(product);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
