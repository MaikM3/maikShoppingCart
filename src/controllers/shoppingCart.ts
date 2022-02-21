import { pool } from '../shared/conn'

export class ShoppingCartInput {
  status_id: number;
  user_id?: number;
}


export interface ShoppingCart {
  id: number;
  status_id: number;
  user_id?: number;
  subtotal: number;
  discount_amount: number;
  taxes_amount: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}

const TABLE = 'shopping_cart'

export default class Controller {
  public async getAll(): Promise<[ShoppingCart]> {
    const resp = await pool.query(`SELECT * FROM ${TABLE}`);
    return (resp.rows as [ShoppingCart]);
  }

  public async getOne(id: number): Promise<ShoppingCart | null> {
    const resp = await pool.query(`SELECT * from ${TABLE} where id = $1`, [id]);
    
    return (resp.rowCount > 0 ? resp.rows[0] as ShoppingCart : null);
  }

  public async getOpenByUser(user_id: number): Promise<ShoppingCart | null> {
    const resp = await pool.query(`SELECT * from ${TABLE} where user_id = $1 AND status_id != 3`, [user_id]);
    
    return (resp.rowCount > 0 ? resp.rows[0] as ShoppingCart : null);
  }

  public async add(shoppingCart: ShoppingCartInput): Promise<ShoppingCart> {
    const resp = await pool.query(`INSERT INTO ${TABLE} (status_id, user_id, subtotal, discount_amount, taxes_amount
      , total, created_at, updated_at) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [shoppingCart.status_id, shoppingCart.user_id, 0, 0, 0, 0, new Date(), new Date()]);

    return (resp.rows[0] as ShoppingCart);
  }

  public async update(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
    const resp = await pool.query(`UPDATE ${TABLE} 
    SET "status_id"=$1, user_id=$2, subtotal= $3, "discount_amount"=$4, taxes_amount=$5, total= $6, updated_at=$7 WHERE id = $8 RETURNING *`,
    [shoppingCart.status_id, shoppingCart.user_id, shoppingCart.subtotal, shoppingCart.discount_amount, shoppingCart.taxes_amount,
      shoppingCart.total, new Date(), shoppingCart.id]);
    
    return (resp.rows[0]);
  }

  public async changeStatus(shoppingCartId: number, statusId: number ): Promise<ShoppingCart> {
    const resp = await pool.query(`UPDATE ${TABLE} 
    SET "status_id"=$1, updated_at=$2 WHERE id = $3 RETURNING *`,
    [statusId, new Date(), shoppingCartId]);
    
    return (resp.rows[0]);
  }

  public async delete(id: number): Promise<number> {
    const resp = await pool.query(`DELETE FROM ${TABLE} where id = $1`, [id]);
    
    return (resp.rowCount);
  }
}