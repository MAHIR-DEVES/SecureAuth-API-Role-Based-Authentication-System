import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    return res.status(201).json({
      success: true,
      message: 'user crate successfully',
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserIntoDB();

    return res.status(201).json({
      success: true,
      message: ' get all user successfully',
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get single user
const getSingleUSer = async (req: Request, res: Response) => {
  try {
    const user = req.user!.email;
    const result = await userService.getSingleUserIntoDB(user);

    return res.status(201).json({
      success: true,
      message: ' get  user successfully',
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUSer,
};
