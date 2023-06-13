import mongoose from 'mongoose';
const { Schema } = mongoose;

const adSchema = new Schema({
  userId:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
  },
  cat:{
    type:String,
    required:true,
  },
  desc:{
    type:String,
    required:true,
  },
  location:{
    type:String,
    required:false,
  },
  cover:{
    type:String,
    required:true,
  },
  images:{
    type:[String],
    required:false,
  },
  totalStars:{
    type:Number,
    default:0,
  },
  starNumber:{
    type:Number,
    default:0,
  },
  price:{
    type:Number,
    required:true,
  },
  shortTitle:{
    type:String,
    required:true,
  },
  shortDesc:{
    type:String,
    required:true,
  },
  features: {
    type: [String],
    required: false,
  },
  sales:{
    type: Number,
    default:0
  },
  fileLink:{
    type: String,
    required:true,
  },
},{
    timestamps:true
});

export default mongoose.model("Ad", adSchema)