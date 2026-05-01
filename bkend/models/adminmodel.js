let mongoose=require("mongoose")
let adminsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "password":String,
    "mobile":String,
    "role":{
        type:String,
        default:"merchant"
    }
})
let Admin=mongoose.model("admins",adminsch)
module.exports=Admin