import User from "../models/user.model.js"
import createError from "../utils/createError.js"

export  const deleteUser = async (req, res, next) =>{



const user = await User.findById(req.params.id)    

    if(req.userId !== user._id.toString() ) {
        return next(createError(403, "You can only delete your account!"));
        
    }
    
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send("User deleted")


}


export  const getUser = async (req, res, next) =>{

if(!req.params.id || !req.params) return next(createError(404, "Nothing to search for"));


    const user = await User.findById(req.params.id)    
    
    return res.status(200).send(user)
    
    
    }