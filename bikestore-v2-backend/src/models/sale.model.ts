import {Entity, model, property} from '@loopback/repository';

@model()
export class Sale extends Entity {
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
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  workerName: string;

  @property({
    type: 'string',
    required: true,
  })
  clientName: string;

  @property({
    type: 'string',
    required: true,
  })
  ProductName: string;

  @property({
    type: 'number',
    required: true,
  })
  salePrice: number;

  @property({
    type: 'number',
    required: true,
  })
  productQuantity: number;


  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
