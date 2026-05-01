let express=require("express")
let router=express.Router()
let {addadmin,adminlogin}=require("../controllers/admincont")
router.post("/reg",addadmin)
router.post("/login",adminlogin)
module.exports=router