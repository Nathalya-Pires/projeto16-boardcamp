import { Router } from "express";
import { addGames, listGames } from "../controllers/games.js";

const gameRoutes = Router();

gameRoutes.get("/games", listGames);
gameRoutes.post("/games", addGames);

export default gameRoutes;