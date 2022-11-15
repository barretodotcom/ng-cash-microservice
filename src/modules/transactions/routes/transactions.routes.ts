import { Router } from "express";
import { TransactionsController } from "../controllers/TransactionsController";

const transactionsRoutes = Router();

transactionsRoutes.get("/find-account-transactions/:accountId", TransactionsController.listAccountTransactions);

export default transactionsRoutes;