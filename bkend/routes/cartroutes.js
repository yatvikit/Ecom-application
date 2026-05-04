let express=require("express")
let router=express.Router()
let {addcart,getcart,deletecart,incrementcart,decrementcart}=require("../controllers/cartcont") 
router.post("/addcart",addcart)
router.get("/getcart/:userid",getcart)
router.delete("/deletecart/:id",deletecart)
router.put("/incrementcart/:id",incrementcart)
router.put("/decrementcart/:id",decrementcart)
module.exports=router