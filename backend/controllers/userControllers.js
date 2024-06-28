const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
    
}
exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(422).json({
                success: false,
                error: "Please add all the fields"
            });
        }
        
        
        const exits = await userModel.findOne({ email });
        if (exits) {
            return res.status(422).json({
                success: false,
                error: "User already exists"
            });
        }
        //validation
        if (!validator.isEmail(email)) {
            return res.status(422).json({
                success: false,
                error: "Invalid email"
            });
        }
        if (validator.isStrongPassword(password)||password.length < 5  ) {
            return res.status(422).json({
                success: false,
                message: "Password not strong enough"
            });
        }
        console.log(name, email, password);

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await userModel.create({
            name, email, password: hashedPassword
        })


        const token = createToken(newUser._id);
        res.status(200).json({
            success: true,
            message: 'User Created Successfully',
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" });
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                success: false,
                message: "Please add all the fields"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(422).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(422).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = createToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false,
            error: "Internal server error" });
    }
}
