const express = require("express");

const {authMiddleware}=require("../middleware/auth")

const{addToCart,removeFromCart,getCart}=require("../controllers/cartControllers")



const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware, addToCart)

cartRouter.post("/remove", authMiddleware,removeFromCart)

cartRouter.post("/get", authMiddleware,getCart)

module.exports = cartRouter