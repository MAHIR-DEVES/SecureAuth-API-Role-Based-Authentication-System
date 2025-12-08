import bcrypt from 'bcryptjs';
import { pool } from '../../database/db';

const createUserIntoDB = async (payload: Record<string, any>) => {
  const { name, email, password, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `
    INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hashPassword, role]
  );

  delete result.rows[0].password;

  return result;
};

// get all

const getAllUserIntoDB = async () => {
  const result = await pool.query(
    `
    SELECT id,name,email FROM users`
  );

  return result;
};
// get single

const getSingleUserIntoDB = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id,name,email FROM users WHERE email=$1`,
    [email]
  );

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
};
