import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InventorySales,
  Sales,
} from '../models';
import {InventorySalesRepository} from '../repositories';

export class InventorySalesSalesController {
  constructor(
    @repository(InventorySalesRepository)
    public inventorySalesRepository: InventorySalesRepository,
  ) { }

  @get('/inventory-sales/{id}/sales', {
    responses: {
      '200': {
        description: 'Sales belonging to InventorySales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sales)},
          },
        },
      },
    },
  })
  async getSales(
    @param.path.string('id') id: typeof InventorySales.prototype.id,
  ): Promise<Sales> {
    return this.inventorySalesRepository.sales(id);
  }
}
