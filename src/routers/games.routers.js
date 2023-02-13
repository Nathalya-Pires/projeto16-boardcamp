import { Router } from "express";
import { addGames, listGames } from "../controllers/games.js";

const gameRouter = Router();

gameRouter.get("/games", listGames);
gameRouter.post("/games", addGames);

export default gameRouter;