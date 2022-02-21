import ShoppingCartController, { ShoppingCart } from '../controllers/shoppingCart'
import ShoppingCartItemController, { ShoppingCartItem } from '../controllers/shoppingCartItem'
import logger from '../shared/logger';
import { ShoppingCartInput } from '../controllers/shoppingCart'
import ShoppingCartTaxController from '../controllers/shoppingCartTax';

let ctrlSp: ShoppingCartController;
let ctrlSpi: ShoppingCartItemController;
let ctrlTaxControler: ShoppingCartTaxController;

export interface itemInput {
  item_id: number,
  user_id: number,
  quantity: number
}

const INVOICED_STATUS = 3;

export default class ShoppingCartLogic {
  shoppingCartCont() {
    return ctrlSp ?? new ShoppingCartController();
  }
  shoppingCartItemCont() {
    return ctrlSpi ?? new ShoppingCartItemController();
  }

  shoppingCartTaxCont() {
    return ctrlTaxControler ?? new ShoppingCartTaxController();
  }

  public async addItemToShoppingCart(itemToAdd: itemInput): Promise<ShoppingCartItem> {
    // find open shoppingCart for user, if not exists create
    let shoppingCart = await this.shoppingCartCont().getOpenByUser(itemToAdd.user_id);

    if (!shoppingCart) {
      const newSp: ShoppingCartInput =  {
        status_id: 1,
        user_id: itemToAdd.user_id
      }
      shoppingCart = await this.shoppingCartCont().add(newSp);
      await this.shoppingCartCont().addTaxes(shoppingCart.id, 1);
      await this.shoppingCartCont().addTaxes(shoppingCart.id, 2);
    } 

    // find items in cart, if exists update qty, if not create 
    let shoppingCartItem = await this.shoppingCartItemCont().getOne(shoppingCart.id, itemToAdd.item_id);
    if (!shoppingCartItem) {
      shoppingCartItem = await this.shoppingCartItemCont().add({
        shopping_cart_id: shoppingCart.id,
        item_id: itemToAdd.item_id,
        qty: itemToAdd.quantity
      });

      
    } else {
      shoppingCartItem = await this.shoppingCartItemCont().updateQuantity({ ...shoppingCartItem, qty:  itemToAdd.quantity });
      logger.info('update spi', shoppingCartItem);
    }

    // calculate acumulators 
    shoppingCart = await this.calculateAccums(shoppingCart);

    return shoppingCartItem;
  }

  async calculateAccums(shoppingCart: ShoppingCart) {
    // subtotal
    const shoppingCartItemList = await this.shoppingCartItemCont().getItemInShoppingCart(shoppingCart.id);
    
    shoppingCart.subtotal = shoppingCartItemList.reduce( (subtotal, spi) => {
      return subtotal + ( Number(spi.qty) * spi.price) 
    }, 0);

    //tax
    const taxList = await this.shoppingCartTaxCont().getTaxInShoppingCart(shoppingCart.id)
    
    shoppingCart.taxes_amount = taxList.reduce( (totalTax, tax) => {
      return totalTax + ( Number(tax.percentage) * shoppingCart.subtotal /100) 
    }, 0);
    
    // TODO: discount should be calculed here also

    // total

    shoppingCart.total = shoppingCart.subtotal + shoppingCart.taxes_amount 

    return await this.shoppingCartCont().update(shoppingCart);
  }

  public async invoiceCart(shoppingCartId: number): Promise<ShoppingCart> {
    // TODO Process the order, create the invoice
    logger.info('shoppingCartId, INVOICED_STATUS', shoppingCartId, INVOICED_STATUS);
    
    return await this.shoppingCartCont().changeStatus(shoppingCartId, INVOICED_STATUS);
  }
}