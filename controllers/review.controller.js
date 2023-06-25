import Review from "../models/review.model.js";
import Ad from "../models/ad.model.js";
import User from "../models/user.model.js"
import createError from "../utils/createError.js";


export  const createReview = async (req, res, next) =>{



    const user = await User.findById(req.userId); 

    if(!user)  return next(createError(403, "User not found"));


    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    });
    try{
       const review = await Review.findOne(
        {
        gigId:req.body.gigId,
        userId:req.userId,
        });
        if(review) return next(createError(403, "You have already created a review!"));


        //Ver se o user comprou o produto para poder fazer review

        //review your own add should not be possible



        const savedReview = await newReview.save();
        await Ad.findByIdAndUpdate(req.body.gigId, {$inc: {totalStars: req.body.star, starNumber: 1}})
        res.status(201).send(savedReview);
    }catch(err){
        next(err);
    }
};

export  const getReviews = async (req, res, next) =>{
    const reviews = await Review.find({gigId: req.params.gigId});
    res.status(200).send(reviews);
    try{


    }catch(err){
        next(createError(err));
    }
};


export  const deleteReview = async (req, res, next) =>{

    try{


    }catch(err){
        next(createError(err));
    }
};