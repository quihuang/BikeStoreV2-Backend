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
import {Sales} from '../models';
import {SalesRepository} from '../repositories';

export class SalesController {
  constructor(
    @repository(SalesRepository)
    public salesRepository : SalesRepository,
  ) {}

  @post('/sales')
  @response(200, {
    description: 'Sales model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sales)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {
            title: 'NewSales',
            exclude: ['id'],
          }),
        },
      },
    })
    sales: Omit<Sales, 'id'>,
  ): Promise<Sales> {
    return this.salesRepository.create(sales);
  }

  @get('/sales/count')
  @response(200, {
    description: 'Sales model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sales) where?: Where<Sales>,
  ): Promise<Count> {
    return this.salesRepository.count(where);
  }

  @get('/sales')
  @response(200, {
    description: 'Array of Sales model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sales, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sales) filter?: Filter<Sales>,
  ): Promise<Sales[]> {
    return this.salesRepository.find(filter);
  }

  @patch('/sales')
  @response(200, {
    description: 'Sales PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {partial: true}),
        },
      },
    })
    sales: Sales,
    @param.where(Sales) where?: Where<Sales>,
  ): Promise<Count> {
    return this.salesRepository.updateAll(sales, where);
  }

  @get('/sales/{id}')
  @response(200, {
    description: 'Sales model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sales, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sales, {exclude: 'where'}) filter?: FilterExcludingWhere<Sales>
  ): Promise<Sales> {
    return this.salesRepository.findById(id, filter);
  }

  @patch('/sales/{id}')
  @response(204, {
    description: 'Sales PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {partial: true}),
        },
      },
    })
    sales: Sales,
  ): Promise<void> {
    await this.salesRepository.updateById(id, sales);
  }

  @put('/sales/{id}')
  @response(204, {
    description: 'Sales PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sales: Sales,
  ): Promise<void> {
    await this.salesRepository.replaceById(id, sales);
  }

  @del('/sales/{id}')
  @response(204, {
    description: 'Sales DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.salesRepository.deleteById(id);
  }
}
