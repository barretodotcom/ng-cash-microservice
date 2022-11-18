import { dataSource } from "../../../../shared/typeorm/connection";
import { TransactionQueries } from "../../../../shared/utils/queries/transactionsQueries";
import { Account } from "../../../accounts/typeorm/entities/Account";
import { Transactions } from "../entities/Account";


interface ITransaction {
    debitedAccount: Account;
    creditedAccount: Account;
    value: number;
}

export class TransactionsRepository {
    static readonly transactionsRepository = dataSource.getRepository(Transactions);

    static async findByAccount(account: Account): Promise<Transactions[]> {
        const accountTransactions = await this.transactionsRepository.find({
            where: [
                { debitedAccount: account },
                { creditedAccount: account }
            ]
        })

        return accountTransactions;

    }

    static async createTransaction({ debitedAccount, creditedAccount, value }: ITransaction) {
        const transaction = this.transactionsRepository.create({
            debitedAccount,
            creditedAccount,
            balance: value
        })

        await this.transactionsRepository.save(transaction);
    }

    static async calcAccountBalance(accountId: number) {
        const balance = await this.transactionsRepository.query(TransactionQueries.getUserBalanceQuery(), [accountId]);

        return balance;
    }
}