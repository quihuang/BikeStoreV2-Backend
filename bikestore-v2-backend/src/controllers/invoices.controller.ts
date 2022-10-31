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
import {Invoices} from '../models';
import {InvoicesRepository} from '../repositories';

export class InvoicesController {
  constructor(
    @repository(InvoicesRepository)
    public invoicesRepository : InvoicesRepository,
  ) {}

  @post('/invoices')
  @response(200, {
    description: 'Invoices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Invoices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {
            title: 'NewInvoices',
            exclude: ['id'],
          }),
        },
      },
    })
    invoices: Omit<Invoices, 'id'>,
  ): Promise<Invoices> {
    return this.invoicesRepository.create(invoices);
  }

  @get('/invoices/count')
  @response(200, {
    description: 'Invoices model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Invoices) where?: Where<Invoices>,
  ): Promise<Count> {
    return this.invoicesRepository.count(where);
  }

  @get('/invoices')
  @response(200, {
    description: 'Array of Invoices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Invoices, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Invoices) filter?: Filter<Invoices>,
  ): Promise<Invoices[]> {
    return this.invoicesRepository.find(filter);
  }

  @patch('/invoices')
  @response(200, {
    description: 'Invoices PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {partial: true}),
        },
      },
    })
    invoices: Invoices,
    @param.where(Invoices) where?: Where<Invoices>,
  ): Promise<Count> {
    return this.invoicesRepository.updateAll(invoices, where);
  }

  @get('/invoices/{id}')
  @response(200, {
    description: 'Invoices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Invoices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Invoices, {exclude: 'where'}) filter?: FilterExcludingWhere<Invoices>
  ): Promise<Invoices> {
    return this.invoicesRepository.findById(id, filter);
  }

  @patch('/invoices/{id}')
  @response(204, {
    description: 'Invoices PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoices, {partial: true}),
        },
      },
    })
    invoices: Invoices,
  ): Promise<void> {
    await this.invoicesRepository.updateById(id, invoices);
  }

  @put('/invoices/{id}')
  @response(204, {
    description: 'Invoices PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() invoices: Invoices,
  ): Promise<void> {
    await this.invoicesRepository.replaceById(id, invoices);
  }

  @del('/invoices/{id}')
  @response(204, {
    description: 'Invoices DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.invoicesRepository.deleteById(id);
  }
}
