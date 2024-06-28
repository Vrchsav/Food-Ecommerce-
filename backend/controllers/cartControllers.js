const userModel = require("../models/userModel");




exports.addToCart = async (req, res) => {
    try {
       
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success:true,message:"added to cart"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }

}

exports.removeFromCart = async (req, res) => {
    try {
        let  userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).json({success:true,message:"removed from cart"});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }

}



exports.getCart = async (req, res) => {
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.status(200).json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:"Internal server error"});
    }

}