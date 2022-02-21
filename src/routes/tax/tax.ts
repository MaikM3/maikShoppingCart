import TaxController from "../../controllers/tax";
import { Request, Response } from "express";

export const getAll = async (_req: Request, res: Response) => {
  const controller = new TaxController();
  const response = await controller.getAll();
  return res.status(200).send(response);
}

export const getOne =  async (req: Request, res: Response) => {
  const controller = new TaxController();
  const response = await controller.getOne(parseInt(req.params.id));
  return res.status(200).send(response);
}

export const add = async (req: Request, res: Response) => {
    const { name, percentage, fixedAmount } = req.body
    const controller = new TaxController();
    const response = await controller.add({name, percentage, fixedAmount});
    return res.status(200).send(response);
  };

export const update = async (req: Request, res: Response) => {
  const { name, percentage } = req.body
  const tax = { id: parseInt(req.params.id), name, percentage}
  const controller = new TaxController();
  const response = await controller.update(tax);
  return res.status(200).send(response);
};

export const remove = async (req: Request, res: Response) => {
  const controller = new TaxController();
  const response = await controller.delete(parseInt(req.params.id));
  return res.sendStatus(response > 0 ? 200 : 404);
};
