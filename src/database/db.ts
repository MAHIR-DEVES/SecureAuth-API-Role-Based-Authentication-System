import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_lYf2A7egFPVw@ep-super-resonance-a86gedb2-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

export const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL,
      age INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database Connect successfully!');
};
