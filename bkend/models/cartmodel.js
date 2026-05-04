let mongoose=require("mongoose")
let cartsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":Number,
    "image":String,
    "category":String,
    "salername":String,
    "quantity":Number,
    "userid":String,
    "productid":String
})
let Cart=mongoose.model("cart",cartsch)
module.exports=Cart