import { randomUUID as uuid } from 'node:crypto';

type BaseEntityProps = {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
};

export class BaseEntity {
  private _id: string;
  private _createdAt: number;
  private _updatedAt: number;

  constructor({ id, createdAt, updatedAt }: BaseEntityProps) {
    this._id = id ?? uuid();
    this._createdAt = createdAt ?? Date.now();
    this._updatedAt = updatedAt ?? Date.now();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }
}
