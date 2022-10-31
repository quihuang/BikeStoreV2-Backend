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
import {Clients} from '../models';
import {ClientsRepository} from '../repositories';

export class ClientsController {
  constructor(
    @repository(ClientsRepository)
    public clientsRepository : ClientsRepository,
  ) {}

  @post('/clients')
  @response(200, {
    description: 'Clients model instance',
    content: {'application/json': {schema: getModelSchemaRef(Clients)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clients, {
            title: 'NewClients',
            exclude: ['id'],
          }),
        },
      },
    })
    clients: Omit<Clients, 'id'>,
  ): Promise<Clients> {
    return this.clientsRepository.create(clients);
  }

  @get('/clients/count')
  @response(200, {
    description: 'Clients model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Clients) where?: Where<Clients>,
  ): Promise<Count> {
    return this.clientsRepository.count(where);
  }

  @get('/clients')
  @response(200, {
    description: 'Array of Clients model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Clients, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Clients) filter?: Filter<Clients>,
  ): Promise<Clients[]> {
    return this.clientsRepository.find(filter);
  }

  @patch('/clients')
  @response(200, {
    description: 'Clients PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clients, {partial: true}),
        },
      },
    })
    clients: Clients,
    @param.where(Clients) where?: Where<Clients>,
  ): Promise<Count> {
    return this.clientsRepository.updateAll(clients, where);
  }

  @get('/clients/{id}')
  @response(200, {
    description: 'Clients model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Clients, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Clients, {exclude: 'where'}) filter?: FilterExcludingWhere<Clients>
  ): Promise<Clients> {
    return this.clientsRepository.findById(id, filter);
  }

  @patch('/clients/{id}')
  @response(204, {
    description: 'Clients PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clients, {partial: true}),
        },
      },
    })
    clients: Clients,
  ): Promise<void> {
    await this.clientsRepository.updateById(id, clients);
  }

  @put('/clients/{id}')
  @response(204, {
    description: 'Clients PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() clients: Clients,
  ): Promise<void> {
    await this.clientsRepository.replaceById(id, clients);
  }

  @del('/clients/{id}')
  @response(204, {
    description: 'Clients DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientsRepository.deleteById(id);
  }
}
