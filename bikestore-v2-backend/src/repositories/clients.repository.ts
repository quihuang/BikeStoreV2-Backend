import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Clients, ClientsRelations} from '../models';

export class ClientsRepository extends DefaultCrudRepository<
  Clients,
  typeof Clients.prototype.id,
  ClientsRelations
> {
  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource,
  ) {
    super(Clients, dataSource);
  }
}
