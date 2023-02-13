import { Router } from "express";
import { addRentals, deleteRental, listRentals, rentReturn } from "../controllers/rentals.js"; 
import { confirmSchema } from "../middlewares/confirmSchema.js";
import { rentalSchema } from "../schemas/rentals.schema.js";

const rentalsRoutes = Router();

rentalsRoutes.get("/rentals", listRentals);
rentalsRoutes.post("/rentals", confirmSchema(rentalSchema), addRentals);
rentalsRoutes.post("/rentals/:id/return", rentReturn);
rentalsRoutes.delete("/rentals/:id", deleteRental);


export default rentalsRoutes;