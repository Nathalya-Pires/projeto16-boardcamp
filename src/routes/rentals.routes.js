import { Router } from "express";
import { addRentals, deleteRental, listRentals, rentReturn } from "../controllers/rentals.js"; 

const rentalsRoutes = Router();

rentalsRoutes.get("/rentals", listRentals);
rentalsRoutes.post("/rentals", addRentals);
rentalsRoutes.post("/rentals/:id/return", rentReturn);
rentalsRoutes.delete("/rentals/:id", deleteRental);


export default rentalsRoutes;