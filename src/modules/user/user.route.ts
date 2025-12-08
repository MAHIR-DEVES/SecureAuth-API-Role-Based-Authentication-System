import { Router } from 'express';
import { userController } from './user.controller';
import verify from '../../middleware/verify';
import auth from '../../middleware/auth';
import { Roles } from '../auth/auth.consent';

const router = Router();

router.post('/', verify, userController.createUser);
router.get('/', auth(Roles.admin), userController.getAllUser);
router.get('/single', auth(Roles.user), userController.getSingleUSer);

export const userRoute = router;
