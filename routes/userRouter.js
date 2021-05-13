
const express = require('express');

const userRouter = express.Router();

const {
  register,
  login 
} = require('../services/UserService');


userRouter
.route('/') 
.post(register)
.post(login); 


module.exports =  userRouter;