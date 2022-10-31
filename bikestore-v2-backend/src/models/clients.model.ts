import {Entity, model, property} from '@loopback/repository';

@model()
export class Clients extends Entity {
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


  constructor(data?: Partial<Clients>) {
    super(data);
  }
}

export interface ClientsRelations {
  // describe navigational properties here
}

export type ClientsWithRelations = Clients & ClientsRelations;
