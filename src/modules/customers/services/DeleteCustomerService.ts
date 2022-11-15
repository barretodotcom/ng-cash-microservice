import { AppError } from "../../../shared/errors/AppError";
import { CustomerRepository } from "../typeorm/repository/CustomerRepository";

export class DeleteCustomer {
    static async execute(customerId: number): Promise<void> {
        const user = await CustomerRepository.findById(customerId);

        if (!user) {
            throw new AppError("Usuário não encontrado.")
        }

        await CustomerRepository.deleteById(customerId);

    }
}