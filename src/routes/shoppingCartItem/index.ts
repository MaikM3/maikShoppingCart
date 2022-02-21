import { Router } from 'express';
import { getItems } from './shoppingCartItem'
const shoppingCartItemRouter = Router();

shoppingCartItemRouter.get('/:id',getItems);

export default shoppingCartItemRouter;
