import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Invoices, InvoicesRelations, Workers, Inventory} from '../models';
import {WorkersRepository} from './workers.repository';
import {InventoryRepository} from './inventory.repository';

export class InvoicesRepository extends DefaultCrudRepository<
  Invoices,
  typeof Invoices.prototype.id,
  InvoicesRelations
> {

  public readonly workers: BelongsToAccessor<Workers, typeof Invoices.prototype.id>;

  public readonly inventory: BelongsToAccessor<Inventory, typeof Invoices.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('WorkersRepository') protected workersRepositoryGetter: Getter<WorkersRepository>, @repository.getter('InventoryRepository') protected inventoryRepositoryGetter: Getter<InventoryRepository>,
  ) {
    super(Invoices, dataSource);
    this.inventory = this.createBelongsToAccessorFor('inventory', inventoryRepositoryGetter,);
    this.registerInclusionResolver('inventory', this.inventory.inclusionResolver);
    this.workers = this.createBelongsToAccessorFor('workers', workersRepositoryGetter,);
    this.registerInclusionResolver('workers', this.workers.inclusionResolver);
  }
}
