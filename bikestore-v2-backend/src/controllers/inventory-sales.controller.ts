import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InventorySales} from '../models';
import {InventorySalesRepository} from '../repositories';

export class InventorySalesController {
  constructor(
    @repository(InventorySalesRepository)
    public inventorySalesRepository : InventorySalesRepository,
  ) {}

  @post('/inventory-sales')
  @response(200, {
    description: 'InventorySales model instance',
    content: {'application/json': {schema: getModelSchemaRef(InventorySales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {
            title: 'NewInventorySales',
            exclude: ['id'],
          }),
        },
      },
    })
    inventorySales: Omit<InventorySales, 'id'>,
  ): Promise<InventorySales> {
    return this.inventorySalesRepository.create(inventorySales);
  }

  @get('/inventory-sales/count')
  @response(200, {
    description: 'InventorySales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InventorySales) where?: Where<InventorySales>,
  ): Promise<Count> {
    return this.inventorySalesRepository.count(where);
  }

  @get('/inventory-sales')
  @response(200, {
    description: 'Array of InventorySales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InventorySales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InventorySales) filter?: Filter<InventorySales>,
  ): Promise<InventorySales[]> {
    return this.inventorySalesRepository.find(filter);
  }

  @patch('/inventory-sales')
  @response(200, {
    description: 'InventorySales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {partial: true}),
        },
      },
    })
    inventorySales: InventorySales,
    @param.where(InventorySales) where?: Where<InventorySales>,
  ): Promise<Count> {
    return this.inventorySalesRepository.updateAll(inventorySales, where);
  }

  @get('/inventory-sales/{id}')
  @response(200, {
    description: 'InventorySales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InventorySales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InventorySales, {exclude: 'where'}) filter?: FilterExcludingWhere<InventorySales>
  ): Promise<InventorySales> {
    return this.inventorySalesRepository.findById(id, filter);
  }

  @patch('/inventory-sales/{id}')
  @response(204, {
    description: 'InventorySales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InventorySales, {partial: true}),
        },
      },
    })
    inventorySales: InventorySales,
  ): Promise<void> {
    await this.inventorySalesRepository.updateById(id, inventorySales);
  }

  @put('/inventory-sales/{id}')
  @response(204, {
    description: 'InventorySales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inventorySales: InventorySales,
  ): Promise<void> {
    await this.inventorySalesRepository.replaceById(id, inventorySales);
  }

  @del('/inventory-sales/{id}')
  @response(204, {
    description: 'InventorySales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventorySalesRepository.deleteById(id);
  }
}
