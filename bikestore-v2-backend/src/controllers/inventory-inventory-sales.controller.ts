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
  InventorySales,
} from '../models';
import {InventoryRepository} from '../repositories';

export class InventoryInventorySalesController {
  constructor(
    @repository(InventoryRepository) protected inventoryRepository: InventoryRepository,
  ) { }

  @get('/inventories/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Array of Inventory has many InventorySales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InventorySales)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InventorySales>,
  ): Promise<InventorySales[]> {
    return this.inventoryRepository.inventorySales(id).find(filter);
  }

  @post('/inventories/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: {'application/json': {schema: getModelSchemaRef(InventorySales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inventory.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {
            title: 'NewInventorySalesInInventory',
            exclude: ['id'],
            optional: ['inventoryId']
          }),
        },
      },
    }) inventorySales: Omit<InventorySales, 'id'>,
  ): Promise<InventorySales> {
    return this.inventoryRepository.inventorySales(id).create(inventorySales);
  }

  @patch('/inventories/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Inventory.InventorySales PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {partial: true}),
        },
      },
    })
    inventorySales: Partial<InventorySales>,
    @param.query.object('where', getWhereSchemaFor(InventorySales)) where?: Where<InventorySales>,
  ): Promise<Count> {
    return this.inventoryRepository.inventorySales(id).patch(inventorySales, where);
  }

  @del('/inventories/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Inventory.InventorySales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InventorySales)) where?: Where<InventorySales>,
  ): Promise<Count> {
    return this.inventoryRepository.inventorySales(id).delete(where);
  }
}
