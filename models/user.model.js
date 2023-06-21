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
},{
    timestamps:true
});

export default mongoose.model("User", userSchema)
