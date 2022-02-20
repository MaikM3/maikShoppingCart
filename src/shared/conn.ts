import 'dotenv/config'

import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: false
})
