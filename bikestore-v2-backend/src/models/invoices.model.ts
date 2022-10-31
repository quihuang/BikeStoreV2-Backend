import {Entity, model, property} from '@loopback/repository';

@model()
export class Invoices extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  workerId: string;

  @property({
    type: 'string',
    required: true,
  })
  inventorysId: string;


  constructor(data?: Partial<Invoices>) {
    super(data);
  }
}

export interface InvoicesRelations {
  // describe navigational properties here
}

export type InvoicesWithRelations = Invoices & InvoicesRelations;
