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
  Invoices,
} from '../models';
import {WorkersRepository} from '../repositories';

export class WorkersInvoicesController {
  constructor(
    @repository(WorkersRepository) protected workersRepository: WorkersRepository,
  ) { }

  @get('/workers/{id}/invoices', {
    responses: {
      '200': {
        description: 'Array of Workers has many Invoices',
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
    return this.workersRepository.invoices(id).find(filter);
  }

  @post('/workers/{id}/invoices', {
    responses: {
      '200': {
        description: 'Workers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoices)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Workers.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {
            title: 'NewInvoicesInWorkers',
            exclude: ['id'],
            optional: ['workersId']
          }),
        },
      },
    }) invoices: Omit<Invoices, 'id'>,
  ): Promise<Invoices> {
    return this.workersRepository.invoices(id).create(invoices);
  }

  @patch('/workers/{id}/invoices', {
    responses: {
      '200': {
        description: 'Workers.Invoices PATCH success count',
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
    return this.workersRepository.invoices(id).patch(invoices, where);
  }

  @del('/workers/{id}/invoices', {
    responses: {
      '200': {
        description: 'Workers.Invoices DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Invoices)) where?: Where<Invoices>,
  ): Promise<Count> {
    return this.workersRepository.invoices(id).delete(where);
  }
}
