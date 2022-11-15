import { Router } from "express";
import isCustomerAuthenticated from "../../../shared/http/middlewares/isCustomerAuthenticated";
import { TransactionsController } from "../controllers/TransactionsController";

const transactionsRoutes = Router();

transactionsRoutes.get("/find-account-transactions", isCustomerAuthenticated, TransactionsController.listAccountTransactions);
transactionsRoutes.post("/send-transaction-message", isCustomerAuthenticated, TransactionsController.sendTransactionMessage);

export default transactionsRoutes;