import { HasherGateway } from '@domain/gateways/hasher.gateway';

export class InMemoryHasherGateway implements HasherGateway {
  async hash(value: string): Promise<string> {
    return btoa(value);
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return value === atob(hashedValue);
  }
}
