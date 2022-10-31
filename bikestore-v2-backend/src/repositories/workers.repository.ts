import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BikeStoreMongoDbDataSource} from '../datasources';
import {Workers, WorkersRelations, Invoices, Sales} from '../models';
import {InvoicesRepository} from './invoices.repository';
import {SalesRepository} from './sales.repository';

export class WorkersRepository extends DefaultCrudRepository<
  Workers,
  typeof Workers.prototype.id,
  WorkersRelations
> {

  public readonly invoices: HasManyRepositoryFactory<Invoices, typeof Workers.prototype.id>;

  public readonly sales: HasManyRepositoryFactory<Sales, typeof Workers.prototype.id>;

  constructor(
    @inject('datasources.BikeStoreMongoDB') dataSource: BikeStoreMongoDbDataSource, @repository.getter('InvoicesRepository') protected invoicesRepositoryGetter: Getter<InvoicesRepository>, @repository.getter('SalesRepository') protected salesRepositoryGetter: Getter<SalesRepository>,
  ) {
    super(Workers, dataSource);
    this.sales = this.createHasManyRepositoryFactoryFor('sales', salesRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoicesRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
  }
}
