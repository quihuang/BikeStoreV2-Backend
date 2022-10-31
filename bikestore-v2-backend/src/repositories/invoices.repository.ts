import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Invoices, InvoicesRelations} from '../models';

export class InvoicesRepository extends DefaultCrudRepository<
  Invoices,
  typeof Invoices.prototype.id,
  InvoicesRelations
> {
  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource,
  ) {
    super(Invoices, dataSource);
  }
}
