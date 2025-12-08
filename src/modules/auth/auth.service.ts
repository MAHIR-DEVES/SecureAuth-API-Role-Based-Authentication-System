import bcrypt from 'bcryptjs';
import { pool } from '../../database/db';
import jwt from 'jsonwebtoken';

export const secret = '4f8d9e2a-1b3c-4a7d-8c5b-2e6f1a9b0d7c';

const loginUserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1`,
    [email]
  );
  // user check
  if (user.rows.length === 0) {
    throw new Error('user not fount');
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  // password check
  if (!matchPassword) {
    throw new Error('invalid cardinal');
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const token = jwt.sign(jwtPayload, secret, { expiresIn: '7d' });
  return { token };
};

export const authService = {
  loginUserIntoDB,
};
