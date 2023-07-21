import { Address } from '@domain/entities/address.entity';
import { Cart } from '@domain/entities/cart.entity';
import { Customer } from '@domain/entities/customer.entity';
import { Payment } from '@domain/entities/payment.entity';
import { Customer as RawCustomer } from '@prisma/client';

export class CustomerMapper {
  static toPersistence(custommer: Customer): RawCustomer {
    const cart = {
      id: custommer.cart.id,
      total: custommer.cart.total,
      products: custommer.cart.products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      createdAt: custommer.cart.createdAt,
      updatedAt: custommer.cart.updatedAt,
    };

    const addresses = custommer.addresses.map((address) => ({
      id: address.id,
      street: address.street,
      number: address.number,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    }));

    const paymentMethods = custommer.paymentMethods.map((paymentMethod) => ({
      id: paymentMethod.id,
      cardNumber: paymentMethod.cardNumber,
      paymentMethod: paymentMethod.paymentMethod,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    }));

    return {
      id: custommer.id,
      name: custommer.name,
      email: custommer.email,
      password: custommer.password,
      cart,
      addresses,
      paymentMethods,
      createdAt: custommer.createdAt,
      updatedAt: custommer.updatedAt,
    };
  }

  static toDomain(raw: RawCustomer): Customer {
    const cart = Cart.create({
      id: raw.cart.id,
      total: raw.cart.total,
      products: raw.cart.products,
      updatedAt: raw.cart.updatedAt,
      createdAt: raw.cart.createdAt,
    });

    const addresses = raw.addresses.map((address) =>
      Address.create({
        id: address.id,
        street: address.street,
        number: address.number,
        complement: address.complement,
        district: address.district,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
        updatedAt: address.updatedAt,
        createdAt: address.createdAt,
      }),
    );

    const paymentMethods = raw.paymentMethods.map((paymentMethod) =>
      Payment.create({
        id: paymentMethod.id,
        cardNumber: paymentMethod.cardNumber,
        paymentMethod: paymentMethod.paymentMethod as any,
        updatedAt: paymentMethod.updatedAt,
        createdAt: paymentMethod.createdAt,
      }),
    );

    return Customer.create({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      cart,
      addresses,
      paymentMethods,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
