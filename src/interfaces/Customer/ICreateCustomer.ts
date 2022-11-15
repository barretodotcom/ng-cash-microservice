import { Account } from "../../modules/accounts/typeorm/entities/Account";

export interface ICreateCustomer {
    username: string;
    password: string;
}