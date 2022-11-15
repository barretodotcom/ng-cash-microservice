import { dataSource } from "../../../../shared/typeorm/connection";
import { Customer } from "../../../customers/typeorm/entities/Customer";
import { Transactions } from "../../../transactions/typeorm/entities/Account";
import { Account } from "../entities/Account";

interface IAccountCreated {
    id: number,
    balance: number
    transactions: Transactions[],
    createdAt: Date
}

export class AccountRepository {
    static readonly accountRepository = dataSource.getRepository(Account);

    static async findById(accountId: number): Promise<Account | null> {
        const account = await this.accountRepository.findOne({
            where: { id: accountId }
        })

        return account;
    }

    static async findByCustomer(customer: Customer): Promise<Account | null> {
        const account = await this.accountRepository.findOneBy({ customer });

        return account;
    }

    static async createAccount(customer: Customer): Promise<IAccountCreated> {

        const account = this.accountRepository.create({
            balance: 0,
            customer: customer,
        })

        await this.accountRepository.save(account);

        const newAccount = {
            id: account.id,
            balance: account.balance,
            transactions: account.transactions,
            createdAt: account.createdAt
        }

        return newAccount;
    }
}