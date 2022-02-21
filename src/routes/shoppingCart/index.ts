import { Router } from 'express';
import { getAll, getOne, add, addItemToShoppingCard, invoiceCart, removeItemToShoppingCard } from './shoppingCart'
const shoppingCartRouter = Router();

shoppingCartRouter.get('/',getAll);
shoppingCartRouter.get('/:id/',getOne);
shoppingCartRouter.post('/', add);
shoppingCartRouter.post('/addItemToShoppingCard/', addItemToShoppingCard);
shoppingCartRouter.post('/invoiceCart/', invoiceCart);
shoppingCartRouter.delete('/removeItemToShoppingCard', removeItemToShoppingCard);

export default shoppingCartRouter;
