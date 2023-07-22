export class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(`Order with id "${orderId}" not found`);
    this.name = 'OrderNotFoundError';
  }
}
