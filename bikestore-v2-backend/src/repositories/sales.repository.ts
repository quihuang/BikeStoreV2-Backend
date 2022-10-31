import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Sales, SalesRelations} from '../models';

export class SalesRepository extends DefaultCrudRepository<
  Sales,
  typeof Sales.prototype.id,
  SalesRelations
> {
  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource,
  ) {
    super(Sales, dataSource);
  }
}
