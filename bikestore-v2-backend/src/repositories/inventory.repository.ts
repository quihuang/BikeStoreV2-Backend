import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Inventory, InventoryRelations, Invoices, InventorySales} from '../models';
import {InvoicesRepository} from './invoices.repository';
import {InventorySalesRepository} from './inventory-sales.repository';

export class InventoryRepository extends DefaultCrudRepository<
  Inventory,
  typeof Inventory.prototype.id,
  InventoryRelations
> {

  public readonly invoices: HasManyRepositoryFactory<Invoices, typeof Inventory.prototype.id>;

  public readonly inventorySales: HasManyRepositoryFactory<InventorySales, typeof Inventory.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('InvoicesRepository') protected invoicesRepositoryGetter: Getter<InvoicesRepository>, @repository.getter('InventorySalesRepository') protected inventorySalesRepositoryGetter: Getter<InventorySalesRepository>,
  ) {
    super(Inventory, dataSource);
    this.inventorySales = this.createHasManyRepositoryFactoryFor('inventorySales', inventorySalesRepositoryGetter,);
    this.registerInclusionResolver('inventorySales', this.inventorySales.inclusionResolver);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoicesRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
  }
}
