import { Router } from "express";
import { listCustomers, listCustomersId, addCustomer,updateCustomer } from "../controllers/customers.js";
import { confirmSchema } from "../middlewares/confirmSchema.js";
import { customerSchema } from "../schemas/customers.schema.js";

const customersRoutes = Router();

customersRoutes.get("/customers", listCustomers);
customersRoutes.get("/customers/:id", listCustomersId);
customersRoutes.post("/customers", confirmSchema(customerSchema), addCustomer);
customersRoutes.put("/customers/:id", confirmSchema(customerSchema), updateCustomer);

export default customersRoutes;