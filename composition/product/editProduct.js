const Product = require("../../models/Product");


const editProduct = async (req, res) => {
    try{
        const {id, title, description, price} = req.body;
        console.log(id, title, description, price, "alwidjawildj")
        const newProduct = await Product.findByIdAndUpdate({_id: id}, {$set: {title, description, price}});
        return res.status(201).json(newProduct)
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = editProduct