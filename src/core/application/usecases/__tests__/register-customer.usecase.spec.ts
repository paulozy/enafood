import { CustomerRepository } from '@domain/repositories/customer-repository.interface';
import { CustomerAlreadyExistsError } from '../@errors/customer-already-exists-error';
import { RegisterCustomerUseCase } from '../register-customer.usecase';
import { InMemoryCustomerRepository } from './repositories/in-memory-customer-repository';
import { InMemoryHasherGateway } from './repositories/in-memory-hasher-gateway';

describe('Register Customer UseCase', () => {
  let usecase: RegisterCustomerUseCase;
  let customerRepository: CustomerRepository;

  const payload = {
    name: 'John Doe',
    email: 'johndoe@email.com',
    plainTextPassword: '12345678',
  };

  beforeEach(() => {
    const hasher = new InMemoryHasherGateway();

    customerRepository = new InMemoryCustomerRepository();
    usecase = new RegisterCustomerUseCase(customerRepository, hasher);
  });

  it('should create a new customer on success', async () => {
    const customer = await usecase.execute(payload);

    expect(customer).toBeDefined();
    expect(customer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: payload.name,
        email: payload.email,
        password: expect.any(String),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
      }),
    );
  });

  it('should throw an error if customer already exists', async () => {
    await usecase.execute(payload);

    await expect(usecase.execute(payload)).rejects.toBeInstanceOf(
      CustomerAlreadyExistsError,
    );
  });

  it('should hash the password before saving', async () => {
    const spy = jest.spyOn(InMemoryHasherGateway.prototype, 'hash');

    await usecase.execute(payload);

    expect(spy).toHaveBeenCalledWith(payload.plainTextPassword);

    spy.mockRestore();
  });
});
