import express from "express";
import taxRouter from './tax'
import shoppingCartRouter from "./shoppingCart";
import itemRouter from "./item";
import shoppingCartItemRouter from "./shoppingCartItem";

const router = express.Router();

router.use('/tax', taxRouter)
router.use('/item', itemRouter)
router.use('/shoppingCart', shoppingCartRouter)
router.use('/shoppingCartItem', shoppingCartItemRouter)

export default router;