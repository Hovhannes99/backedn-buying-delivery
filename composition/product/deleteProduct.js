const Product = require("../../models/Product");


const deleteProduct = async (req, res) => {
    try{
        const {id} = req.headers;
        const newProduct = await Product.findByIdAndDelete({_id: id });
        return res.status(201).json({newProduct, isRemoved: true})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = deleteProduct