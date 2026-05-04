let cart=require("../models/cartmodel")
let addcart=async(req,res)=>{
    try{
        let arr=await cart.find({userid:req.body.userid,productid:req.body.productid})
        if(arr.length>0){
           await cart.findByIdAndUpdate(arr[0]._id, {$inc:{quantity:1}})
        }else{
            let data=new cart({...req.body,"quantity":1,"_id":new Date().getTime().toString()})
            await data.save()
        }
        res.send("Item added to cart")
    }catch(err){
        res.status(500).send("Error adding item to cart")
    }
}
let getcart=async(req,res)=>{
    try{
        let data=await cart.find({userid:req.params.userid})
        res.send(data)
    }catch(err){
        res.status(500).send("Error fetching cart items")
    }
}
let deletecart=async(req,res)=>{
    try{
        await cart.findByIdAndDelete(req.params.id)
        res.send("Item removed from cart")
    }catch(err){
        res.status(500).send("Error removing item from cart")
    }
}  
let incrementcart=async(req,res)=>{
    try{
        await cart.findByIdAndUpdate(req.params.id, {$inc:{quantity:1}}) 
        res.send("Item quantity updated")
    }catch(err){
        res.status(500).send("Error updating item quantity")
    }
}
let decrementcart=async(req,res)=>{
    try{
        let item=await cart.findByIdAndUpdate(req.params.id, {$inc:{quantity:-1}})
        res.send("Item quantity updated")
    }
    catch(err){
        res.status(500).send("Error updating item quantity")
    }
}
module.exports={addcart,getcart,deletecart,incrementcart,decrementcart}