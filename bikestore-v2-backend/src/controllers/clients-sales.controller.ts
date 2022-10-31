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
  Clients,
  Sales,
} from '../models';
import {ClientsRepository} from '../repositories';

export class ClientsSalesController {
  constructor(
    @repository(ClientsRepository) protected clientsRepository: ClientsRepository,
  ) { }

  @get('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Array of Clients has many Sales',
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
    return this.clientsRepository.sales(id).find(filter);
  }

  @post('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Clients model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sales)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clients.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sales, {
            title: 'NewSalesInClients',
            exclude: ['id'],
            optional: ['clientsId']
          }),
        },
      },
    }) sales: Omit<Sales, 'id'>,
  ): Promise<Sales> {
    return this.clientsRepository.sales(id).create(sales);
  }

  @patch('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Clients.Sales PATCH success count',
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
    return this.clientsRepository.sales(id).patch(sales, where);
  }

  @del('/clients/{id}/sales', {
    responses: {
      '200': {
        description: 'Clients.Sales DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sales)) where?: Where<Sales>,
  ): Promise<Count> {
    return this.clientsRepository.sales(id).delete(where);
  }
}
