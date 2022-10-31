import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoices,
  Inventory,
} from '../models';
import {InvoicesRepository} from '../repositories';

export class InvoicesInventoryController {
  constructor(
    @repository(InvoicesRepository)
    public invoicesRepository: InvoicesRepository,
  ) { }

  @get('/invoices/{id}/inventory', {
    responses: {
      '200': {
        description: 'Inventory belonging to Invoices',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventory)},
          },
        },
      },
    },
  })
  async getInventory(
    @param.path.string('id') id: typeof Invoices.prototype.id,
  ): Promise<Inventory> {
    return this.invoicesRepository.inventory(id);
  }
}
