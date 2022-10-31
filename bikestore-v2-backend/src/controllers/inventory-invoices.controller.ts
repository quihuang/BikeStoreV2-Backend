import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inventory,
  Invoices,
} from '../models';
import {InventoryRepository} from '../repositories';

export class InventoryInvoicesController {
  constructor(
    @repository(InventoryRepository) protected inventoryRepository: InventoryRepository,
  ) { }

  @get('/inventories/{id}/invoices', {
    responses: {
      '200': {
        description: 'Array of Inventory has many Invoices',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoices)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Invoices>,
  ): Promise<Invoices[]> {
    return this.inventoryRepository.invoices(id).find(filter);
  }

  @post('/inventories/{id}/invoices', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoices)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {
            title: 'NewInvoicesInInventory',
            exclude: ['id'],
            optional: ['inventoryId']
          }),
        },
      },
    }) invoices: Omit<Invoices, 'id'>,
  ): Promise<Invoices> {
    return this.inventoryRepository.invoices(id).create(invoices);
  }

  @patch('/inventories/{id}/invoices', {
    responses: {
      '200': {
        description: 'Inventory.Invoices PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {partial: true}),
        },
      },
    })
    invoices: Partial<Invoices>,
    @param.query.object('where', getWhereSchemaFor(Invoices)) where?: Where<Invoices>,
  ): Promise<Count> {
    return this.inventoryRepository.invoices(id).patch(invoices, where);
  }

  @del('/inventories/{id}/invoices', {
    responses: {
      '200': {
        description: 'Inventory.Invoices DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Invoices)) where?: Where<Invoices>,
  ): Promise<Count> {
    return this.inventoryRepository.invoices(id).delete(where);
  }
}
