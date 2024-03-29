import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  desc:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:false,
  },
  country:{
    type:String,
    required:false,
  },
  phoneNumber:{
    type:String,
    required:false,
  },
  balance:{
    type:Number,
    required:false,
    default:0
  },
  numberOfAds:{
    type:Number,
    required:false,
    default:0
  },
  emailVerified:{
    type:Boolean,
    required:false,
    default:false
  },
  purchasedOrders:{
    type:[String],
    required:false,
  },
},{
    timestamps:true
});

export default mongoose.model("User", userSchema)
