import {Entity, model, property} from '@loopback/repository';

@model()
export class InventorySales extends Entity {
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
  inventoryId: string;

  @property({
    type: 'string',
    required: true,
  })
  saleId: string;

  constructor(data?: Partial<InventorySales>) {
    super(data);
  }
}

export interface InventorySalesRelations {
  // describe navigational properties here
}

export type InventorySalesWithRelations = InventorySales & InventorySalesRelations;
