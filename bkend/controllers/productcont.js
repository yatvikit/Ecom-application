let Product=require("../models/productmodel")
let fs=require("fs")
let multer=require("multer")
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now().toString()+"."+file.mimetype.split("/")[1])
    }
})
let upload=multer({storage:storage})    
let addproduct=async (req,res)=>{
    try {
       
        let product=new Product({...req.body,"image":req.file.filename,"_id":Date.now().toString()})
        await product.save()
        res.status(201).json({message:"Product added successfully"})
    } catch (error) {
        res.status(500).json({message:"Error adding product"})
    }   
        
}
let getproducts=async(req,res)=>{
    try {
        let products=await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:"Error fetching products"})
    }   
}
let getproduct=async(req,res)=>{
    try {
        let product=await Product.findById(req.params.id)
       res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:"Error fetching product"})
    }
}
let deleteproduct=async(req,res)=>{
    try {
        let product=await Product.findByIdAndDelete(req.params.id)
        fs.rm(`./uploads/${product.image}`,{force:true},()=>{})
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting product"})
    }
}
let updateproductdetails=async(req,res)=>{
    try {
        await Product.findByIdAndUpdate(req.body._id,req.body)
        res.status(200).json({message:"Product details updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Error updating product details"})
    }   
} 

let updateproductimage=async(req,res)=>{
    try{
        let product=await Product.findByIdAndUpdate(req.body._id,{"image":req.file.filename})
        fs.rm(`./uploads/${product.image}`,{force:true},()=>{})
        res.status(200).json({message:"Product image updated successfully"})
    } catch (error) {
        res.status(500).json({message:"Error updating product image"})
    }
}

module.exports={addproduct,getproducts,getproduct,deleteproduct,updateproductdetails,updateproductimage,upload}
