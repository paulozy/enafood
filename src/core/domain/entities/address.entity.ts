import { BaseEntity } from '@shared/domain/entities/base.entity';

type AddressProps = {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt?: number;
  updatedAt?: number;
};

export class Address extends BaseEntity {
  private _street: string;
  private _number: string;
  private _complement?: string;
  private _district: string;
  private _city: string;
  private _state: string;
  private _country: string;
  private _zipCode: string;

  private constructor({
    id,
    street,
    number,
    complement,
    district,
    city,
    state,
    country,
    zipCode,
    createdAt,
    updatedAt,
  }: AddressProps) {
    super({ id, createdAt, updatedAt });
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._district = district;
    this._city = city;
    this._state = state;
    this._country = country;
    this._zipCode = zipCode;
  }

  static create(props: AddressProps): Address {
    return new Address(props);
  }

  static update(address: Address, props: AddressProps): Address {
    return Address.create({
      ...address,
      ...props,
    });
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string | undefined {
    return this._complement;
  }

  get district(): string {
    return this._district;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get country(): string {
    return this._country;
  }

  get zipCode(): string {
    return this._zipCode;
  }
}
