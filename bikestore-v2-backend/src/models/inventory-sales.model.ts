import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Inventory} from './inventory.model';
import {Sales} from './sales.model';

@model()
export class InventorySales extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Inventory)
  inventoryId: string;

  @belongsTo(() => Sales)
  salesId: string;

  constructor(data?: Partial<InventorySales>) {
    super(data);
  }
}

export interface InventorySalesRelations {
  // describe navigational properties here
}

export type InventorySalesWithRelations = InventorySales & InventorySalesRelations;
