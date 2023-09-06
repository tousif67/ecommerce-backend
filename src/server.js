const app =require(".");
const { connectDb } = require("./config/db");

const port=3001;


app.listen(port,async()=>{
        await connectDb();

    console.log("ecommerce-api is listening on Port :  ",port);
})