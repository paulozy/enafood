export class ProductQuantityNotEnoughError extends Error {
  constructor(qtd: number) {
    super(`Product quantity is not enough. Current quantity: ${qtd}`);
    this.name = 'ProductQuantityNotEnoughError';
  }
}
