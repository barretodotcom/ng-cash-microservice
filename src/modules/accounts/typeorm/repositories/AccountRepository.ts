import { dataSource } from "../../../../shared/typeorm/connection";
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

    static async completeTransaction(debitedAccount: Account, creditedAccount: Account) {

        const deb = await this.accountRepository.save(debitedAccount);
        await this.accountRepository.save(creditedAccount);

    }
}