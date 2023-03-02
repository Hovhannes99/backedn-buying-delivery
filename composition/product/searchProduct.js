const Product = require("../../models/Product");


const searchProduct = async (req, res) => {
    try {
        const { text } = req.headers;
      const data =  await Product.find({ title: {$regex : '.*'+text.toLowerCase()+'.*', $options: "$i"}}).exec();
        if (data){
            return  res.status(201).json(data)
        }
        return res.status(402).json({errors:{message: "something goes wrong"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }

}

module.exports = searchProduct