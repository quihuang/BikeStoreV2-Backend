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
  HttpErrors,
} from '@loopback/rest';
import {User, Workers} from '../models';
import {WorkersRepository} from '../repositories';
import {AuthenticationService} from '../services';
import {service} from '@loopback/core';

export class WorkersController {
  constructor(
    @service(AuthenticationService)
    public authenticationService: AuthenticationService,
    @repository(WorkersRepository)
    public workersRepository: WorkersRepository,
  ) {}

  @post('/login')
  @response(200, {
    description: 'Successful login',
  })
  async login(@requestBody() user: User) {
    const worker = await this.authenticationService.login(
      user.email,
      user.password,
    );

    if (worker) {
      const token = this.authenticationService.generateTokenJWTObject(worker);

      return {
        data: {
          id: worker.id,
          name: worker.name,
          email: worker.email,
          phoneNumber: worker.phoneNumber,
        },
        token: token,
      };
    } else {
      throw new HttpErrors[401]('The data entered is not valid!');
    }
  }

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
            exclude: ['id', 'password'],
          }),
        },
      },
    })
    workers: Omit<Workers, 'id'>,
  ): Promise<Workers> {
    const valid = await this.workersRepository.findOne({
      where: {email: workers.email},
    });
    if (valid != null) {
      throw new HttpErrors[401](
        'the entered email is already registered in the database',
      );
    }

    workers.password = this.authenticationService.createPassword();

    let message = `
    <tbody>
    <tr>
      <td align="left" bgcolor="#2E51A2" height="56" style="padding-left:24px">
        <a href="https://bikestore.com/" style="color:#ffffff"
          target="_blank"
          data-saferedirecturl="https://www.google.com/url?q=https://bikestore.com/">
          <h3>Welcome to the BikeStore app</h3></a>
      </td>
    </tr>

    <tr>
      <td align="left" bgcolor="#FFFFFF" style="padding:24px">
        <div style="font-size:12px;color:#323232">
          <div style="line-height:24px">
            Hello ${workers.name} ${workers.lastName},
            <br>
            <br>
            Thank you for signing up to BikeStore.com<br>
            Your account is now active, with the role <strong>${workers.role}</strong> and your password is <strong>${workers.password}</strong>
          </div>
        </div>
        <div style="display:block;padding-top:20px;text-align:center">
          <br>
          <a href="https://bikestore.com/"
            style="display:inline-block;background-color:#2e51a2;padding:4px 8px;color:#ffffff;font-size:12px;text-decoration:none"
            target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://bikestore.com/">Go to
            BikeStore.com</a>
          <br>
          <br>
        </div>
    </tbody>
`;
    this.authenticationService.sendEmail(
      workers.email,
      'Welcome to the BikeStore app',
      message,
    );

    workers.password = this.authenticationService.encryptObject(
      workers.password,
    );

    return this.workersRepository.create(workers);
  }

  @get('/workers/count')
  @response(200, {
    description: 'Workers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Workers) where?: Where<Workers>): Promise<Count> {
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
    @param.filter(Workers, {exclude: 'where'})
    filter?: FilterExcludingWhere<Workers>,
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
