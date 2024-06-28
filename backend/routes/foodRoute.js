const express = require("express");
const router = express.Router();



const {addFood,removeFood,listFood}=require("../controllers/foodControllers")


router.post("/add",addFood)

router.get("/list",listFood)

router.post("/remove",removeFood)



module.exports = router