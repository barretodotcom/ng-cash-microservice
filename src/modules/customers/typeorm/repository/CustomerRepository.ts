import { ICreateCustomer } from "../../../../interfaces/Customer/ICreateCustomer";
import { dataSource } from "../../../../shared/typeorm/connection"
import { Customer } from "../entities/Customer"



export class CustomerRepository {

    static customerRepository = dataSource.getRepository(Customer)

    static async findById(id: number): Promise<Customer | null> {
        const customer = await this.customerRepository.findOneBy({ id })

        return customer;
    }

    static async findByUsername(username: string): Promise<Customer | null> {
        const customer = await this.customerRepository.findOneBy({ username })

        return customer;
    }

    static async deleteById(id: number) {
        await this.customerRepository.delete({ id })
    }

    static async createCustomer({ username, password }: ICreateCustomer): Promise<Customer> {

        const customer = this.customerRepository.create({ username, password });

        await this.customerRepository.save(customer);

        return customer;
    }

}