let Admin=require("../models/adminmodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")

let addadmin=async(req,res)=>{
    try {
        let exist=await Admin.findById(req.body._id)
        if(exist){
            return res.status(400).json({message:"Account already exists"})
        }
        else
        {
            let pwdhash=await bcrypt.hash(req.body.password,10)
            let admin=new Admin({...req.body,password:pwdhash})
            await admin.save()
            res.status(201).json({message:"Bussiness added successfully"})
        }
    } catch (error) {
        res.status(500).json({message:"Error adding admin"})
    }   
}
let adminlogin=async(req,res)=>{
    try {
        let admin=await Admin.findById(req.body._id)
        if(!admin){
            return res.status(400).json({message:"Admin not found"})   
         }
         let isMatch=await bcrypt.compare(req.body.password,admin.password)
         if(!isMatch){
             return res.status(400).json({message:"Invalid credentials"})
         }
         res.status(200).json({"token":jwt.sign({_id:admin._id,role:admin.role},process.env.SECRET_KEY,{expiresIn:"1h"}),"name":admin.name,"role":admin.role})
    } catch (error) {
        res.status(500).json({message:"Error logging in admin"})
    }   
}
module.exports={addadmin,adminlogin}