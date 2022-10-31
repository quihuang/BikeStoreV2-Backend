import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoices,
  Workers,
} from '../models';
import {InvoicesRepository} from '../repositories';

export class InvoicesWorkersController {
  constructor(
    @repository(InvoicesRepository)
    public invoicesRepository: InvoicesRepository,
  ) { }

  @get('/invoices/{id}/workers', {
    responses: {
      '200': {
        description: 'Workers belonging to Invoices',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workers)},
          },
        },
      },
    },
  })
  async getWorkers(
    @param.path.string('id') id: typeof Invoices.prototype.id,
  ): Promise<Workers> {
    return this.invoicesRepository.workers(id);
  }
}
