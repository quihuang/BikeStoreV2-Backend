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
  Clients,
} from '../models';
import {SalesRepository} from '../repositories';

export class SalesClientsController {
  constructor(
    @repository(SalesRepository)
    public salesRepository: SalesRepository,
  ) { }

  @get('/sales/{id}/clients', {
    responses: {
      '200': {
        description: 'Clients belonging to Sales',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clients)},
          },
        },
      },
    },
  })
  async getClients(
    @param.path.string('id') id: typeof Sales.prototype.id,
  ): Promise<Clients> {
    return this.salesRepository.clients(id);
  }
}
