const mongoose=require("mongoose");

const ratingSchema=new mangoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId(ObjectId),
        required:true,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId(ObjectId),
        required:true,
        ref:"Product"
    },
    ratingCount:{type:Number,min:1,max:5,required:true},
    review:{type:String},

},{
    timestamps:true
})
const ratingModel = mongoose.model("rating", ratingSchema);

module.exports=ratingModel;