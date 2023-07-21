import { Customer } from '@domain/entities/customer.entity';
import { CustomerRepository } from '@domain/repositories/customer-repository.interface';

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: Customer[] = [];

  async exists(email: string): Promise<boolean> {
    return this.customers.some((customer) => customer.email === email);
  }

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === customer.id,
    );

    this.customers[customerIndex] = customer;
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
