import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import adRoute from "./routes/ad.route.js"
import orderRoute from "./routes/order.route.js"
import reviewRoute from "./routes/review.route.js"
import authenticationRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected To DB!");
    }catch(error){
        console.log(error);
    }
};
app.use(cors({origin: "http://localhost:5173", credentials: true}));  //Credential true e para passar os cookies to client para o server
app.use(express.json());  //TO SEND JSON INTO THE CONTROLLERS
app.use(cookieParser());  
app.use("/api/auth", authenticationRoute);

app.use("/api/users", userRoute);
app.use("/api/ads", adRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);



})

app.listen(8800, () =>{
    connect();
    console.log("Backend server is running")
})