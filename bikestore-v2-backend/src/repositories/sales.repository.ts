import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Sales, SalesRelations, Workers, Clients, InventorySales} from '../models';
import {WorkersRepository} from './workers.repository';
import {ClientsRepository} from './clients.repository';
import {InventorySalesRepository} from './inventory-sales.repository';

export class SalesRepository extends DefaultCrudRepository<
  Sales,
  typeof Sales.prototype.id,
  SalesRelations
> {

  public readonly workers: BelongsToAccessor<Workers, typeof Sales.prototype.id>;

  public readonly clients: BelongsToAccessor<Clients, typeof Sales.prototype.id>;

  public readonly inventorySales: HasManyRepositoryFactory<InventorySales, typeof Sales.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('WorkersRepository') protected workersRepositoryGetter: Getter<WorkersRepository>, @repository.getter('ClientsRepository') protected clientsRepositoryGetter: Getter<ClientsRepository>, @repository.getter('InventorySalesRepository') protected inventorySalesRepositoryGetter: Getter<InventorySalesRepository>,
  ) {
    super(Sales, dataSource);
    this.inventorySales = this.createHasManyRepositoryFactoryFor('inventorySales', inventorySalesRepositoryGetter,);
    this.registerInclusionResolver('inventorySales', this.inventorySales.inclusionResolver);
    this.clients = this.createBelongsToAccessorFor('clients', clientsRepositoryGetter,);
    this.registerInclusionResolver('clients', this.clients.inclusionResolver);
    this.workers = this.createBelongsToAccessorFor('workers', workersRepositoryGetter,);
    this.registerInclusionResolver('workers', this.workers.inclusionResolver);
  }
}
