let express=require("express")
let cors=require("cors")
let mongoose=require("mongoose")
require("dotenv").config()
let adminrt=require("./routes/adminroutes")
let userrt=require("./routes/userrt")
let productrt=require("./routes/productroutes")
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("db connected");
}
).catch((err)=>{
    console.log(err);
})
let app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/admin",adminrt)
app.use("/user",userrt)
app.use("/images",express.static("./uploads"))
app.use("/",productrt)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
