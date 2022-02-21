import ShoppingCartItemController from "../../controllers/shoppingCartItem";
import { Request, Response } from "express";

export const getItems =  async (req: Request, res: Response) => {
  const controller = new ShoppingCartItemController();
  const response = await controller.getItemInShoppingCart(parseInt(req.params.id));
  return res.status(200).send(response);
}