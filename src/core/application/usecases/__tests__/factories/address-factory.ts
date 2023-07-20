import { Address } from '@domain/entities/address.entity';

type Payload = {
  city?: string;
  street?: string;
  number?: string;
  district?: string;
  complement?: string;
  zipCode?: string;
  state?: string;
  country?: string;
};

export const makeAddress = (data: Payload) => {
  return Address.create({
    city: data.city ?? 'São Paulo',
    street: data.street ?? 'Rua A',
    number: data.number ?? '123',
    district: data.district ?? 'Centro',
    complement: data.complement ?? 'Casa',
    country: data.country ?? 'Brasil',
    state: data.state ?? 'SP',
    zipCode: data.zipCode ?? '12345678',
  });
};
