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