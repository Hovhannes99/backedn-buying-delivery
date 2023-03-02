const Product = require("../../models/Product");


const   editProduct = async (req, res) => {
    try{
        const {id, title, description, price, isAvailable} = req.body;
        await Product.findOneAndUpdate({_id: id}, {$set: {title, description, price, isAvailable}});
        const newProduct = await Product.findOne({_id: id})
        return res.status(201).json(newProduct)
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = editProduct