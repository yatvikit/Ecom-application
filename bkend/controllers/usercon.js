let User=require("../models/usermodel")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
let nodemailer=require("nodemailer")
const Cart = require("../models/cartmodel")
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
                let arr=await Cart.find({userid:user._id})  
                res.status(200).json({"token":jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"1h"}),"name":user.name,"userid":user._id,"role":"user","cartCount":arr.length})
            }
            else{
                res.status(400).json({message:"Invalid credentials"})
            }
        }
    } catch (error) {
        res.status(500).json({message:"Error logging in"})
    }

}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS,
  },
   tls: {
    rejectUnauthorized: false, // ⚠️ bypass SSL check
  },
});



let genotp=async(req,res)=>{
    try {
        let user=await User.findById(req.body._id)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        else{
            let otp=Math.floor(Math.random()*1e6).toString().padEnd(6,"0")
                await User.findByIdAndUpdate(req.body._id,{otp:otp})
            const info = await transporter.sendMail({
    from: '"Demo email" <irsr560@gmail.com>', // sender address
    to: user._id, // list of recipients
    subject: "OTP to reset password", // subject line
    text: `Your OTP to reset password is: ${otp}`, // plain text body
   // html: "<h1 style='color:orange'>Hello this mail from nodemailer</h1>", // HTML body
  });
  if(info.accepted.length>0){
    res.status(200).json({message:"OTP sent to email"})
  }
  else{    res.status(500).json({message:"Error sending OTP email"})
  }
            // Generate OTP logic here
        }
    } catch (error) {
        res.status(500).json({message:"Error generating OTP"})
    }
}

let resetpwd=async(req,res)=>{
    try {
        let user=await User.findById(req.body._id)
        if(user.otp===req.body.otp){
            let pwdhash=await bcrypt.hash(req.body.password,10)
            await User.findByIdAndUpdate(req.body._id,{password:pwdhash,otp:""})
            res.status(200).json({message:"Password reset successful"})
        }
        else{
            res.status(400).json({message:"Invalid OTP"})
        }
    } catch (error) {
        res.status(500).json({message:"Error resetting password"})
    }
}
module.exports={adduser,login,genotp,resetpwd}
