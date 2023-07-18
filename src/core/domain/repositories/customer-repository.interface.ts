import { Customer } from '@domain/entities/customer.entity';

export abstract class CustomerRepository {
  abstract exists(email: string): Promise<boolean>;
  abstract save(customer: Customer): Promise<void>;
  abstract findById(id: string): Promise<Customer | undefined>;
  abstract findByEmail(email: string): Promise<Customer | undefined>;
  abstract delete(id: string): Promise<void>;
}
