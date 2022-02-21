import express, { Application } from "express";
import logger from './shared/logger';
import morgan from "morgan";
import Router from "./routes";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 8030;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet())

// TODO: move to a proper shared config file
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
})

app.use(limiter)

app.use(Router);

app.listen(PORT, () => {
  logger.info("Server is running on port", PORT);
});