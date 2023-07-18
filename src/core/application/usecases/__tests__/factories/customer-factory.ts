import { Customer } from '@domain/entities/customer.entity';

type Payload = {
  name?: string;
  email?: string;
  password?: string;
};

export const makeCustomer = (data: Payload) => {
  return Customer.create({
    name: data.name ?? 'John Doe',
    email: data.email ?? 'johndoe@email.com',
    password: data.password ?? '12345678',
  });
};
