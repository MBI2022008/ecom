import express from 'express';
import Product from '../models/userModel.js';
import { authUser,
    registerUser,
    updateUserProfile,
    getUserById,
    getUserProfile,
    getusers,
    logoutUser,
    updateUser,
    deleteUser} from '../controllers/userControllers.js';
import {protect,admin} from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(getusers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);
export default router;