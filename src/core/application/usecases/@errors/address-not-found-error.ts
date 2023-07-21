export class AddressNotFoundError extends Error {
  constructor(addressId: string) {
    super(`Address with id "${addressId}" not found`);
    this.name = 'AddressNotFoundError';
  }
}
