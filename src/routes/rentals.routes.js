import { Router } from "express";
import { addRentals, listRentals } from "../controllers/rentals.js"; 

const rentalsRoutes = Router();

rentalsRoutes.get("/rentals", listRentals);
rentalsRoutes.post("/rentals", addRentals);
// rentalsRoutes.get("/rentals", listRentals);
// rentalsRoutes.get("/rentals", listRentals);


export default rentalsRoutes;