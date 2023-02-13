import { Router } from "express";
import { addGames, listGames } from "../controllers/games.js";
import { confirmSchema } from "../middlewares/confirmSchema.js";
import { gameSchema } from "../schemas/games.schema.js";

const gameRoutes = Router();

gameRoutes.get("/games", listGames);
gameRoutes.post("/games", confirmSchema(gameSchema), addGames);

export default gameRoutes;