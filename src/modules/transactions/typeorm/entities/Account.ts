import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, ManyToOne } from "typeorm";
import { Account } from "../../../accounts/typeorm/entities/Account";

@Entity('transactions')
export class Transactions {

    @PrimaryGeneratedColumn('identity')
    id: string;

    @Column()
    balance: number;

    @ManyToOne(type => Account, account => account.transactions)
    debitedAccount: Account;

    @ManyToOne(type => Account, account => account.transactions)
    creditedAccount: Account;

    @CreateDateColumn()
    createdAt: Date;
}