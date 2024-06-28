const express = require("express");
const userRouter = express.Router();



const {registerUser ,loginUser}=require("../controllers/userControllers")



userRouter.post("/login",loginUser)

userRouter.post("/register",registerUser)


module.exports = userRouter