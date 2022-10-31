import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Workers, WorkersRelations} from '../models';

export class WorkersRepository extends DefaultCrudRepository<
  Workers,
  typeof Workers.prototype.id,
  WorkersRelations
> {
  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource,
  ) {
    super(Workers, dataSource);
  }
}
