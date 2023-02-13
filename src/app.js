import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(routers);

const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));