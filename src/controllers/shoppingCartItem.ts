import { pool } from '../shared/conn'
import { Item } from './item';

export class ShoppingCartItemBase {
	shopping_cart_id: number;
	item_id: number;
}

export class ShoppingCartItemInput extends ShoppingCartItemBase {
	qty: number;
}

export interface ShoppingCartItem {
	shopping_cart_id: number,
	item_id: number,
	qty: number,
  created_at: Date;
  updated_at: Date;
}

export interface ShoppingCartItemDetails extends ShoppingCartItem, Item {}

const TABLE = 'shopping_cart_item'
const TABLE_ITEM = 'item'
export default class ShoppingCartItemController {

  public async getItemInShoppingCart(shopping_cart_id: number) {
    const resp = await pool.query(`
    SELECT * from ${TABLE} 
      INNER JOIN ${TABLE_ITEM} ON ${TABLE}.item_id = ${TABLE_ITEM}.id
      WHERE shopping_cart_id = $1`, [shopping_cart_id]);
    console.log('PASO ACA');
    
    return (resp.rows as [ShoppingCartItemDetails]);
  }

  public async getOne(shopping_cart_id: number, item_id: number): Promise<ShoppingCartItem | null> {
    const resp = await pool.query(`SELECT * from ${TABLE} where shopping_cart_id = $1 and item_id = $2`, [shopping_cart_id, item_id]);
    console.log('PASO MAL LUGAR');
    
    return (resp.rows[0] as ShoppingCartItem);
  }

  public async add(shoppingCartItem: ShoppingCartItemInput): Promise<ShoppingCartItem> {
    const resp = await pool.query(`INSERT INTO ${TABLE} (shopping_cart_id, item_id, qty)
      VALUES  ($1, $2, $3) RETURNING *`,
      [shoppingCartItem.shopping_cart_id, shoppingCartItem.item_id, shoppingCartItem.qty]);
    return (resp.rows[0] as ShoppingCartItem);
  }

  public async updateQuantity(shoppingCartItem: ShoppingCartItemInput): Promise<ShoppingCartItem> {
    const resp = await pool.query(`UPDATE ${TABLE} SET qty=$1  WHERE shopping_cart_id=$2 and item_id=$3 RETURNING *`,
    [shoppingCartItem.qty, shoppingCartItem.shopping_cart_id,  shoppingCartItem.item_id]);

    return (resp.rows[0] as ShoppingCartItem);
  }

  public async remove(shoppingCartItem: ShoppingCartItemBase): Promise<number> {
    const resp = await pool.query(`DELETE FROM  ${TABLE} WHERE shopping_cart_id = $1 and item_id = $2 RETURNING *`,
      [ shoppingCartItem.shopping_cart_id , shoppingCartItem.item_id]);
    return (resp.rowCount);
  }

}