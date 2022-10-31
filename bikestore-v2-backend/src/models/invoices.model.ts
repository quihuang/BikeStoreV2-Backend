import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Workers} from './workers.model';
import {Inventory} from './inventory.model';

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

  @belongsTo(() => Workers)
  workersId: string;

  @belongsTo(() => Inventory)
  inventoryId: string;

  constructor(data?: Partial<Invoices>) {
    super(data);
  }
}

export interface InvoicesRelations {
  // describe navigational properties here
}

export type InvoicesWithRelations = Invoices & InvoicesRelations;
