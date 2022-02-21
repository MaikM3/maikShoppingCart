import { pool } from '../shared/conn'

export interface Item {
	id: number,
	description: string,
	price: number,
  created_at: Date;
  updated_at: Date;
}

const TABLE = 'item';

export default class ItemController {
  public async getAll(): Promise<[Item]> {
    const resp = await pool.query(`SELECT * FROM ${TABLE}`);
    return (resp.rows as [Item]);
  }
}