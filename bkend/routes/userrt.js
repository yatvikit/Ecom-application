let express=require("express")
let router=express.Router()
let {adduser,login}=require("../controllers/usercon")
router.post("/reg",adduser)
router.post("/login",login)
module.exports=router