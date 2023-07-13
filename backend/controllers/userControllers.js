import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';

const authUser = asyncHandler(async(req,res) =>{
    const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } 
  else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async(req,res) =>{
    res.send('register user');
});

const logoutUser = asyncHandler(async(req,res) =>{
    res.send('logout user');
});

const getUserProfile = asyncHandler(async(req,res) =>{
    res.send('user Profile');
});
const UpdateUser = asyncHandler(async(req,res) =>{
    res.send('update user');
});

const getusers = asyncHandler(async(req,res) =>{
    res.send('get users');
});

const getUserById= asyncHandler(async(req,res) =>{
    res.send('get user');
});

const deleteUser = asyncHandler(async(req,res) =>{
    res.send('delete user');
});

export {
    authUser,
    registerUser,
    UpdateUser,
    getUserById,
    getUserProfile,
    getusers,
    logoutUser,
    deleteUser
};



