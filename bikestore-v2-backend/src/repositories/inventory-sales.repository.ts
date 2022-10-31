import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {InventorySales, InventorySalesRelations} from '../models';

export class InventorySalesRepository extends DefaultCrudRepository<
  InventorySales,
  typeof InventorySales.prototype.id,
  InventorySalesRelations
> {
  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource,
  ) {
    super(InventorySales, dataSource);
  }
}
