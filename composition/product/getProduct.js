const Product = require("../../models/Product");

const getProductId = async (req, res)=>{
    try{
        const { id } = req.body;
        const product = await Product.findById({_id: id})
        if (product){
            return res.status(201).json(product)
        }
        return res.status(401).json({errors:{message:" not found"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }

}

module.exports = getProductId