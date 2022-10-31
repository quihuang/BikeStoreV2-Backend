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
  Inventory,
} from '../models';
import {InventorySalesRepository} from '../repositories';

export class InventorySalesInventoryController {
  constructor(
    @repository(InventorySalesRepository)
    public inventorySalesRepository: InventorySalesRepository,
  ) { }

  @get('/inventory-sales/{id}/inventory', {
    responses: {
      '200': {
        description: 'Inventory belonging to InventorySales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventory)},
          },
        },
      },
    },
  })
  async getInventory(
    @param.path.string('id') id: typeof InventorySales.prototype.id,
  ): Promise<Inventory> {
    return this.inventorySalesRepository.inventory(id);
  }
}
