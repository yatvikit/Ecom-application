let User=require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let adduser=async(req,res)=>{
    try {
        let exist=await User.findById(req.body._id)
        if(exist){
            return res.status(400).json({message:"User already exists"})
        }
        else
        {

       let pwdhash=await bcrypt.hash(req.body.password,10)
         let user=new User({...req.body,password:pwdhash})
        await user.save()
        res.status(201).json({message:"User added successfully"})
        }
    } catch (error) {
        res.status(500).json({message:"Error adding user"})
    }
}
let login=async(req,res)=>{
    try {
        let user=await User.findById(req.body._id)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        else
        {
            let match=await bcrypt.compare(req.body.password,user.password)
            if(match){
                res.status(200).json({"token":jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"}),"name":user.name       })
            }
            else{
                res.status(400).json({message:"Invalid credentials"})
            }
        }
    } catch (error) {
        res.status(500).json({message:"Error logging in"})
    }

}
module.exports={adduser,login}
