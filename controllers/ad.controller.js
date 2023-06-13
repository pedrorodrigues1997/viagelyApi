import createError from "../utils/createError.js";
import Ad from "../models/ad.model.js";

export  const createAd = async (req, res, next) =>{

    if(!req.isSeller) return next(createError(403, "Only sellers can create a Ad!"));


    const newAd = new Ad({
        userId:req.userId,
        ...req.body
    });

    try{
        const savedAd = await newAd.save();

        res.status(201).json(savedAd);

    }catch(err){
        next(err);
    }
    

};


export  const deleteAd = async (req, res, next) =>{

    try{
        const ad = await Ad.findById(req.params.id); 
        if(ad.userId !== req.userId) return next(createError(403, "You can delete only your Ad!"));

        await Ad.findByIdAndDelete(req.params.id);
        res.status(200).send("Ad has been deleted")
    }catch(err){
        next(err);
    }
};



export  const getAd = async (req, res, next) =>{
    
    try{
        const ad = await Ad.findById(req.params.id); 
        if(!ad) next(createError(404, "Ad not found!"));
        res.status(200).send(ad);
    }catch(err){
        next(err);
    }

};



export  const getAds = async (req, res, next) =>{
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const ads = await Ad.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(ads);
  } catch (err) {
    next(err);
    }

};