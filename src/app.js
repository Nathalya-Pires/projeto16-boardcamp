import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customersRoutes from "./routes/customers.routes.js";
import gameRoutes from "./routes/games.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use([gameRoutes, customersRoutes]);

const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));