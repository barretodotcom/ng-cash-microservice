import { dataSource } from "../../../../shared/typeorm/connection";
import { TransactionsRepository } from "../../../transactions/typeorm/repository/TransactionsRepository";
import { Account } from "../entities/Account";

export class AccountRepository {
    static readonly accountRepository = dataSource.getRepository(Account);

    static async findById(accountId: number): Promise<Account> {
        const account = await this.accountRepository.findOneBy({
            id: accountId
        }) as Account;
        account.balance = parseInt(account.balance.toString())

        return account;
    }

    static async completeTransaction(debitedAccount: Account, creditedAccount: Account, value: number) {
        await TransactionsRepository.createTransaction({ creditedAccount, debitedAccount, value })

        const debitedAccountBalance = await TransactionsRepository.calcAccountBalance(debitedAccount.id);
        const creditedAccountBalance = await TransactionsRepository.calcAccountBalance(creditedAccount.id);

        debitedAccount.balance = debitedAccountBalance;
        creditedAccount.balance = creditedAccountBalance;

        await this.accountRepository.save(debitedAccount);
        await this.accountRepository.save(creditedAccount);

    }
}