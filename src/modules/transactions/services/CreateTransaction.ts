import { AccountRepository } from "../../accounts/typeorm/repositories/AccountRepository";

export interface ITransactionMessage {
    creditedAccountId: number;
    debitedAccountId: number;
    value: number;
}

export class CreateTransactionService {
    static async execute({ debitedAccountId, creditedAccountId, value }: ITransactionMessage) {
        const debitedAccount = await AccountRepository.findById(debitedAccountId);
        const creditedAccount = await AccountRepository.findById(creditedAccountId);

        await AccountRepository.completeTransaction(debitedAccount, creditedAccount, value);
    }
}