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
  Workers,
  Sales,
} from '../models';
import {WorkersRepository} from '../repositories';

export class WorkersSalesController {
  constructor(
    @repository(WorkersRepository) protected workersRepository: WorkersRepository,
  ) { }

  @get('/workers/{id}/sales', {
    responses: {
      '200': {
        description: 'Array of Workers has many Sales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sales)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sales>,
  ): Promise<Sales[]> {
    return this.workersRepository.sales(id).find(filter);
  }

  @post('/workers/{id}/sales', {
    responses: {
      '200': {
        description: 'Workers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Workers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {
            title: 'NewSalesInWorkers',
            exclude: ['id'],
            optional: ['workersId']
          }),
        },
      },
    }) sales: Omit<Sales, 'id'>,
  ): Promise<Sales> {
    return this.workersRepository.sales(id).create(sales);
  }

  @patch('/workers/{id}/sales', {
    responses: {
      '200': {
        description: 'Workers.Sales PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {partial: true}),
        },
      },
    })
    sales: Partial<Sales>,
    @param.query.object('where', getWhereSchemaFor(Sales)) where?: Where<Sales>,
  ): Promise<Count> {
    return this.workersRepository.sales(id).patch(sales, where);
  }

  @del('/workers/{id}/sales', {
    responses: {
      '200': {
        description: 'Workers.Sales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sales)) where?: Where<Sales>,
  ): Promise<Count> {
    return this.workersRepository.sales(id).delete(where);
  }
}
