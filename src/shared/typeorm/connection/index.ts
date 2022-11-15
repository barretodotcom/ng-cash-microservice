import { DataSource } from 'typeorm'
import { Account } from '../../../modules/accounts/typeorm/entities/Account';
import { Transactions } from '../../../modules/transactions/typeorm/entities/Account';

const dataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "docker",
    password: "postgres",
    database: "ng-challenge",
    migrations: ["/src/app/shared/typeorm/migrations"],
    synchronize: false,
    entities: [Account, Transactions]
});

async function connectToDatabase(): Promise<void> {
    await dataSource.initialize();
    console.log("Database connected.")
}

export { dataSource, connectToDatabase };