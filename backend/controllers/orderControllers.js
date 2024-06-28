const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");
const { use } = require("../routes/orderRoute");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {
    const frontend_url = "https://food-ecommerce-pi.vercel.app";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {  cartData: {} });

        //stripe payment
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data : {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: "inr",
                product_data : {
                    name: "shipping charge"
                },
                unit_amount: 2*100
            },
            quantity: 1
        });
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&order_id=${newOrder._id}`,
        });

        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            session_url: session.url
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.verifyOrder = async (req, res) => {
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, { payment : true });
            res.status(200).json({
                success: true,
                message: "Paid"
            });
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.status(200).json({
                success: false,
                message: "Payment failed"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.status(200).json({
            success: true,
            data:orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data:orders
        })
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.status(200).json({
            success: true,
            message: "Status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}