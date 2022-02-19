import express, { Application } from "express";
import logger from './shared/logger';
import morgan from "morgan";
import Router from "./routes";

const PORT = process.env.PORT || 8030;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);

app.listen(PORT, () => {
  logger.info("Server is running on port", PORT);
});