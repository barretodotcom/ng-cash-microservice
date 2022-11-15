import { Router } from "express";
import customerRoutes from "../../../modules/customers/routes/customer.routes";
import transactionsRoutes from "../../../modules/transactions/routes/transactions.routes";

const routes = Router()

routes.use("/customers", customerRoutes);
routes.use("/transactions", transactionsRoutes);

export default routes;