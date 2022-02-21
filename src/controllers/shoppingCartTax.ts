import { pool } from '../shared/conn'
import { Tax } from './tax';

const TABLE = 'shopping_cart_tax'
const TABLE_TAX = 'tax'

export default class ShoppingCartTaxController {
  
  public async getTaxInShoppingCart(shopping_cart_id: number) {
    const resp = await pool.query(`
    SELECT tax.* from ${TABLE} 
      INNER JOIN ${TABLE_TAX} ON ${TABLE}.tax_id = ${TABLE_TAX}.id
      WHERE shopping_cart_id = $1`, [shopping_cart_id]);
    
    return (resp.rows as [Tax]);
  }
}
