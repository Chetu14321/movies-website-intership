const authRoute=require('express').Router();

const {getUserCountController,regController,loginController,logoutController,verifyController,updatePassController,forgotPassController, getAllUsersController} =require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

//register
authRoute.post('/register',regController);

//login
authRoute.post('/login',loginController);

//logout
authRoute.get('/logout',logoutController);

//verify email address
authRoute.get('/verify',authMiddleware,verifyController);

//get all users
authRoute.get('/getall',getAllUsersController)
//update password
authRoute.patch('/update/Password',updatePassController);

//forgot password request
authRoute.post('/forgot/Password',forgotPassController);

//all users
authRoute.get("/count", getUserCountController);



module.exports=authRoute;