const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 4000;




app.use(express.json());
app.use(express.urlencoded());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }));
app.use(cors(
    
));

const db=require("./config/database");
db.connect();


const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();




const rout = require('./routes/foodRoute');
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

app.use('/api/food', rout);
app.use('/api/user',userRouter );
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
