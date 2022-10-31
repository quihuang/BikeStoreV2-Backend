import {Entity, model, property, hasMany} from '@loopback/repository';
import {Invoices} from './invoices.model';
import {InventorySales} from './inventory-sales.model';

@model()
export class Inventory extends Entity {
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
  productName: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  existence: string;

  @property({
    type: 'string',
    required: true,
  })
  purchaseRefNumber: string;

  @property({
    type: 'number',
    required: true,
  })
  priceUniSale: number;

  @property({
    type: 'number',
    required: true,
  })
  priceUniPurchase: number;

  @hasMany(() => Invoices)
  invoices: Invoices[];

  @hasMany(() => InventorySales)
  inventorySales: InventorySales[];

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
}

export type InventoryWithRelations = Inventory & InventoryRelations;
