import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRouter from "./routers/games.routers.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(gameRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));