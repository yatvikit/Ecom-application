let mongoose=require("mongoose")
let productsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":Number,
    "description":String,
    "image":String,
    "category":String,
    "salername":String,
    "comments":[]
})
let Product=mongoose.model("products",productsch)
module.exports=Product
       