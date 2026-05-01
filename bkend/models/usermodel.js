let mongoose=require("mongoose")
let usersch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "password":String,
    "mobile":String,
    "otp":String

})
let User=mongoose.model("users",usersch)
module.exports=User