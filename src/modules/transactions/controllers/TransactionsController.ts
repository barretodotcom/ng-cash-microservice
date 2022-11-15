import { Request, Response } from "express";
import { ListTransactionsServices } from "../services/ListTransactionsService";

export class TransactionsController {
    static async listAccountTransactions(request: Request, response: Response): Promise<Response> {
        const { accountId } = request.params;

        const accountTransactions = await ListTransactionsServices.execute(parseInt(accountId));

        return response.json(accountTransactions)
    }
}