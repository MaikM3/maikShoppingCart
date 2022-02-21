import ShoppingCartController from "../../controllers/shoppingCart";
import ShoppingCartItemController from "../../controllers/shoppingCartItem";
import ShoppingCartLogic from "../../logic/shoppingCart";
import { Request, Response } from "express";

export const getAll = async (_req: Request, res: Response) => {
  const controller = new ShoppingCartController();
  const response = await controller.getAll();
  return res.status(200).send(response);
}

export const getOne =  async (req: Request, res: Response) => {
  const controller = new ShoppingCartController();
  const response = await controller.getOne(parseInt(req.params.id));
  return res.status(200).send(response);
}

export const add = async (req: Request, res: Response) => {
    const { status_id: status_id, user_id } = req.body
    const controller = new ShoppingCartController();
    const response = await controller.add({status_id: status_id, user_id});
    return res.status(200).send(response);
  };


export const addItemToShoppingCard = async (req: Request, res: Response) => {
  const { user_id, item_id, quantity_to_add } = req.body
  const logic = new ShoppingCartLogic();
  const response = await logic.addItemToShoppingCart({ user_id, item_id, quantity: quantity_to_add });
  return res.status(200).send(response);
};

export const removeItemToShoppingCard = async (req: Request, res: Response) => {
  const { shopping_cart_id, item_id } = req.body
  const itemController = new ShoppingCartItemController();
  const response = await itemController.remove({ shopping_cart_id, item_id });
  return  res.sendStatus(response ? 200 : 404);
};

export const invoiceCart = async (req: Request, res: Response) => {
  const { shopping_cart_id } = req.body
  const controller = new ShoppingCartLogic();
  const response = await controller.invoiceCart(shopping_cart_id);
  return res.status(200).send(response);
};
