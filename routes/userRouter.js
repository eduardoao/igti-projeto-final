
const express = require('express');

const userRouter = express.Router();
const loginRouter = express.Router();

const {
  register,
  login 
} = require('../services/UserService');


userRouter
.route('/') 
.post(register)

loginRouter
.route('/')
.post(login); 


module.exports =  {userRouter, loginRouter};