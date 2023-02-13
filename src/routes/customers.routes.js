import { Router } from "express";
import { listCustomers, listCustomersId, addCustomer,updateCustomer } from "../controllers/customers.js";

const customersRoutes = Router();

customersRoutes.get("/customers", listCustomers);
customersRoutes.get("/customers/:id", listCustomersId);
customersRoutes.post("/customers", addCustomer);
customersRoutes.put("/customers/:id", updateCustomer);

export default customersRoutes;