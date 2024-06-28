const foodModel = require("../models/foodModel");
const fs = require("fs")
const uploadFileToCloudinary = require("../config/uploadFileToCloudinary");
const { count } = require("console");
const cloudinary=require('cloudinary').v2;




exports.addFood = async (req, res) => {
    try {
        //file upload
        const file=req.files.image;
        // let path=__dirname+"/files/"+Date.now()+`.${file.name.split(".")[1]}`;
        // file.mv(path,(err)=>{
        //     console.log(err);
        // });
        
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(422).json({ error: "Please add all the fields" });
        }
        const response=await uploadFileToCloudinary(file,"tomato");
        const food=await foodModel.create({name,description,price,image: response.secure_url,category})
        
        res.status(201).json({
            success:true,
            message:"Food added successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success:false,
            error: "Internal server error"+" "+error
        });
        
    }
}




exports.listFood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.status(200).json({
            success:true,
            data:foods
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:"error while fetching data"+" "+err
        })
    }
}



function extractSegment(url) {
    const segments = url.split('/');
    
    for (let i = 0; i < segments.length - 1; i++) {
      if (segments[i].includes('tomato')) {
        return `${segments[i]}/${segments[i + 1].split('.')[0]}`;
      }
    }
    
    return null;
  }
  
//delete food
exports.removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        const img = await foodModel.findById(req.body.id);

        // fs.unlinkSync(img.image);
        console.log(img);
        const segment = extractSegment(img.image);
        await cloudinary.uploader.destroy(segment);
        await foodModel.findByIdAndDelete(id);
        
        res.json({
            success: true,
            data: "deleted successfully",
            message: `data with id ${id} deleted successfully`,
        });
       
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message:err.message,
        });
    }
}



