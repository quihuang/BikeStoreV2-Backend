import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Clients, ClientsRelations, Sales} from '../models';
import {SalesRepository} from './sales.repository';

export class ClientsRepository extends DefaultCrudRepository<
  Clients,
  typeof Clients.prototype.id,
  ClientsRelations
> {

  public readonly sales: HasManyRepositoryFactory<Sales, typeof Clients.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('SalesRepository') protected salesRepositoryGetter: Getter<SalesRepository>,
  ) {
    super(Clients, dataSource);
    this.sales = this.createHasManyRepositoryFactoryFor('sales', salesRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
  }
}
