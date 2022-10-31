import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sales,
  Workers,
} from '../models';
import {SalesRepository} from '../repositories';

export class SalesWorkersController {
  constructor(
    @repository(SalesRepository)
    public salesRepository: SalesRepository,
  ) { }

  @get('/sales/{id}/workers', {
    responses: {
      '200': {
        description: 'Workers belonging to Sales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workers)},
          },
        },
      },
    },
  })
  async getWorkers(
    @param.path.string('id') id: typeof Sales.prototype.id,
  ): Promise<Workers> {
    return this.salesRepository.workers(id);
  }
}
