import ItemController from "../../controllers/item";
import { Request, Response } from "express";

export const getAll = async (_req: Request, res: Response) => {
  const controller = new ItemController();
  const response = await controller.getAll();
  return res.status(200).send(response);
}