import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {environment} from '../config/enviroment';

const config = {
  name: 'BikeStoreMongoDB',
  connector: 'mongodb',
  url: `mongodb+srv://${environment.passwordMongoDB}@desarrollowebquihuang.44kwktd.mongodb.net/BikeStoreDB`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BikeStoreMongoDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'BikeStoreMongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.BikeStoreMongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
