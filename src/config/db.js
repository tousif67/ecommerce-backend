const mongoose= require("mongoose");

const mongodbUrl="mongodb+srv://ansarytousif718:4VaptgiDjJgl2nbU@cluster0.t8g3e2y.mongodb.net/ecommerceDb";


const connectDb=()=>{
    return mongoose.connect(mongodbUrl);
}


module.exports={connectDb};