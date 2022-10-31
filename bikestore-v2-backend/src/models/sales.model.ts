import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Workers} from './workers.model';
import {Clients} from './clients.model';
import {InventorySales} from './inventory-sales.model';

@model()
export class Sales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  productQuantity: number;

  @property({
    type: 'number',
    required: true,
  })
  salePrice: number;

  @belongsTo(() => Workers)
  workersId: string;

  @belongsTo(() => Clients)
  clientsId: string;

  @hasMany(() => InventorySales)
  inventorySales: InventorySales[];

  constructor(data?: Partial<Sales>) {
    super(data);
  }
}

export interface SalesRelations {
  // describe navigational properties here
}

export type SalesWithRelations = Sales & SalesRelations;
