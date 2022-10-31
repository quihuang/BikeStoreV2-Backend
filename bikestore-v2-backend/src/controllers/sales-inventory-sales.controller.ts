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
  Sales,
  InventorySales,
} from '../models';
import {SalesRepository} from '../repositories';

export class SalesInventorySalesController {
  constructor(
    @repository(SalesRepository) protected salesRepository: SalesRepository,
  ) { }

  @get('/sales/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Array of Sales has many InventorySales',
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
    return this.salesRepository.inventorySales(id).find(filter);
  }

  @post('/sales/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Sales model instance',
        content: {'application/json': {schema: getModelSchemaRef(InventorySales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sales.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {
            title: 'NewInventorySalesInSales',
            exclude: ['id'],
            optional: ['salesId']
          }),
        },
      },
    }) inventorySales: Omit<InventorySales, 'id'>,
  ): Promise<InventorySales> {
    return this.salesRepository.inventorySales(id).create(inventorySales);
  }

  @patch('/sales/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Sales.InventorySales PATCH success count',
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
    return this.salesRepository.inventorySales(id).patch(inventorySales, where);
  }

  @del('/sales/{id}/inventory-sales', {
    responses: {
      '200': {
        description: 'Sales.InventorySales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InventorySales)) where?: Where<InventorySales>,
  ): Promise<Count> {
    return this.salesRepository.inventorySales(id).delete(where);
  }
}
