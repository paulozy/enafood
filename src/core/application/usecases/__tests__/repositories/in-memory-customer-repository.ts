import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: Customer[] = [];

  async exists(email: string): Promise<boolean> {
    return this.customers.some((customer) => customer.email === email);
  }

  async save(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async findById(id: string): Promise<Customer> {
    return this.customers.find((customer) => customer.id === id);
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.customers.find((customer) => customer.email === email);
  }

  async delete(id: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }
}
