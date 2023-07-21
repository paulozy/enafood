export class PaymentMethodNotFoundError extends Error {
  constructor(id: string) {
    super(`Payment method with id "${id}" not found`);
    this.name = 'PaymentMethodNotFoundError';
  }
}
