import express from "express";
import TaxController from "../controllers/tax";
import PingController from "../controllers/ping";
import taxRouter from './tax'

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/resp", async (_req, res) => {
  const controller = new TaxController();
  const response = await controller.getResp();
  return res.send(response);
});

router.use('/tax', taxRouter)

export default router;