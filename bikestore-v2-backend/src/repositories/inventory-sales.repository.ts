import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {InventorySales, InventorySalesRelations, Inventory, Sales} from '../models';
import {InventoryRepository} from './inventory.repository';
import {SalesRepository} from './sales.repository';

export class InventorySalesRepository extends DefaultCrudRepository<
  InventorySales,
  typeof InventorySales.prototype.id,
  InventorySalesRelations
> {

  public readonly inventory: BelongsToAccessor<Inventory, typeof InventorySales.prototype.id>;

  public readonly sales: BelongsToAccessor<Sales, typeof InventorySales.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('InventoryRepository') protected inventoryRepositoryGetter: Getter<InventoryRepository>, @repository.getter('SalesRepository') protected salesRepositoryGetter: Getter<SalesRepository>,
  ) {
    super(InventorySales, dataSource);
    this.sales = this.createBelongsToAccessorFor('sales', salesRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
    this.inventory = this.createBelongsToAccessorFor('inventory', inventoryRepositoryGetter,);
    this.registerInclusionResolver('inventory', this.inventory.inclusionResolver);
  }
}
