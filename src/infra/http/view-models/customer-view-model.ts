import { Customer } from '@domain/entities/customer.entity';

export class CustomerViewModel {
  static toHttp(customer: Customer) {
    const paymentMethods = customer.paymentMethods.map((paymentMethod) => ({
      id: paymentMethod.id,
      method: paymentMethod.paymentMethod,
      cardNumber: paymentMethod.cardNumber,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    }));

    const cart = {
      products: customer.cart.products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
      total: customer.cart.total,
    };

    const addresses = customer.addresses.map((address) => ({
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

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      cart,
      paymentMethods,
      addresses,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
