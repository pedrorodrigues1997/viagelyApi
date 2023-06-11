import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userId:{
    type:String,
    required:true,
  },
  adId:{
    type:String,
    required:true,
  },
  star:{
    type:Number,
    required:true,
    enum:[1,2,3,4,5]
  },
  description:{
    type:String,
    required:true,
  },
},{
    timestamps:true
});

export default mongoose.model("Review", ReviewSchema)