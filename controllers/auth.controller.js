import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"



//URL are routed to these methods using the authentication.route.js

export const register = async (req, res, next) =>{
    try{
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ... req.body,
            password: hash,
            balance: 0,
            purchasedOrders: [],
            numberOfAds: 0,
            emailVerified: false
            
        });

        //If emaail already exists.
        //If username
        //Return different errors in each so that we can show the user
        //if(req.body.balance) return next(createError(502, "Forbidden operation"));
        //if(req.body.purchasedOrders) return next(createError(502, "Forbidden operation"));
        //if(req.body.numberOfAds) return next(createError(502, "Forbidden operation"));

        await newUser.save();
        res.status(201).send("User has been created.");


    }catch(err){
        next(err);
    }
}


export const login = async (req, res, next) =>{
    
    try{
        const user = await User.findOne({ username: req.body.username});    //Encontra user na DB
       
        if(!user) return next(createError(404, "User not found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);  //Compara password da db com req
        if(!isCorrect) return next(createError(400, "Wrong password or username"));

        const token = jwt.sign({
            id:user._id,
        }, process.env.JWT_KEY);

        const {password, ...info} = user._doc; //Isto é apenas para extrair e enviar o user sem password
        res.cookie("accessToken", token,{
            httpOnly: true
        }).status(200).send(info);

    }catch(err){
        next(err)
    }
    
}

export const logout = async (req, res , next) =>{
    try{
            res.clearCookie("accessToken", {
                sameSite:"none",
                secure:true,

            })
            .status(200)
            .send("User has been logged out.")

    }catch(err){
        next(err)
    }
    
}