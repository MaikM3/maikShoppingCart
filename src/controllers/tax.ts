import { pool } from '../shared/conn'

import { Get, Path, Route, Controller } from 'tsoa'

interface TaxInput {
  name: string;
  percentage?: number;
  fixedAmount?: number;
}


export interface Tax {
  id: number;
  name: string;
  percentage?: number;
  fixedAmount?: number;
}
@Route("tax")
export class TaxController extends Controller {
  public async getAll(): Promise<[Tax]> {
    const resp = await pool.query("SELECT * from TAX");
    return (resp.rows as [Tax]);
  }
  @Get("{id}")
  public async getOne(@Path() id: number): Promise<Tax | null> {
    const resp = await pool.query("SELECT * from TAX where id = $1", [id]);
    
    return (resp.rowCount > 0 ? resp.rows[0] as Tax : null);
  }

  public async add(tax: TaxInput): Promise<Tax | null> {
    const resp = await pool.query(`INSERT INTO tax (name, percentage)
    VALUES  ($1, $2)  RETURNING *`, [tax.name, tax.percentage]);

    return (resp.rowCount > 0 ? resp.rows[0] as Tax : null);
  }

  public async update(tax: Tax): Promise<Tax | null> {
    const resp = await pool.query(`UPDATE tax 
    SET "name"=$1, percentage=$2 WHERE id = $3 RETURNING *`,
    [tax.name, tax.percentage, tax.id]);
    
    return (resp.rowCount > 0 ? resp.rows[0] as Tax : null);
  }

  public async delete(id: number): Promise<number> {
    const resp = await pool.query("DELETE FROM TAX where id = $1", [id]);
    
    return (resp.rowCount);
  }
}