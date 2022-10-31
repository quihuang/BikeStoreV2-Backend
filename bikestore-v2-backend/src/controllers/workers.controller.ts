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
import {Workers} from '../models';
import {WorkersRepository} from '../repositories';

export class WorkersController {
  constructor(
    @repository(WorkersRepository)
    public workersRepository : WorkersRepository,
  ) {}

  @post('/workers')
  @response(200, {
    description: 'Workers model instance',
    content: {'application/json': {schema: getModelSchemaRef(Workers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workers, {
            title: 'NewWorkers',
            exclude: ['id'],
          }),
        },
      },
    })
    workers: Omit<Workers, 'id'>,
  ): Promise<Workers> {
    return this.workersRepository.create(workers);
  }

  @get('/workers/count')
  @response(200, {
    description: 'Workers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Workers) where?: Where<Workers>,
  ): Promise<Count> {
    return this.workersRepository.count(where);
  }

  @get('/workers')
  @response(200, {
    description: 'Array of Workers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Workers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Workers) filter?: Filter<Workers>,
  ): Promise<Workers[]> {
    return this.workersRepository.find(filter);
  }

  @patch('/workers')
  @response(200, {
    description: 'Workers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workers, {partial: true}),
        },
      },
    })
    workers: Workers,
    @param.where(Workers) where?: Where<Workers>,
  ): Promise<Count> {
    return this.workersRepository.updateAll(workers, where);
  }

  @get('/workers/{id}')
  @response(200, {
    description: 'Workers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Workers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Workers, {exclude: 'where'}) filter?: FilterExcludingWhere<Workers>
  ): Promise<Workers> {
    return this.workersRepository.findById(id, filter);
  }

  @patch('/workers/{id}')
  @response(204, {
    description: 'Workers PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workers, {partial: true}),
        },
      },
    })
    workers: Workers,
  ): Promise<void> {
    await this.workersRepository.updateById(id, workers);
  }

  @put('/workers/{id}')
  @response(204, {
    description: 'Workers PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() workers: Workers,
  ): Promise<void> {
    await this.workersRepository.replaceById(id, workers);
  }

  @del('/workers/{id}')
  @response(204, {
    description: 'Workers DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.workersRepository.deleteById(id);
  }
}
