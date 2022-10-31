import {Entity, model, property, hasMany} from '@loopback/repository';
import {Invoices} from './invoices.model';
import {Sales} from './sales.model';

@model()
export class Workers extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  typeDocument: string;

  @property({
    type: 'string',
    required: true,
  })
  numDocument: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @hasMany(() => Invoices)
  invoices: Invoices[];

  @hasMany(() => Sales)
  sales: Sales[];

  constructor(data?: Partial<Workers>) {
    super(data);
  }
}

export interface WorkersRelations {
  // describe navigational properties here
}

export type WorkersWithRelations = Workers & WorkersRelations;
