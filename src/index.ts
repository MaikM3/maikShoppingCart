import express, { Application } from "express";
import logger from './shared/logger';
import morgan from "morgan";
import helmet from "helmet";
// import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./router/routes";

const PORT = process.env.PORT || 8030;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet())

// TODO: swagger problems. also move to a proper shared config file
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 5, // 5 requests,
// })

// app.use(limiter)

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "public/swagger.json",
    },
  })
);

RegisterRoutes(app);

app.listen(PORT, () => {
  logger.info("Server is running on port", PORT);
});