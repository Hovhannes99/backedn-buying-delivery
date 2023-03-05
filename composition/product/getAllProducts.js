const Product = require("../../models/Product");


const getAllProducts = async (req, res) => {
    try {
        const { variant, searchValue } = req.body;
        if (!!searchValue){
            const searchResult =  await Product.find({ title: {$regex : '.*'+searchValue.toLowerCase()+'.*', $options: "$i"}}).exec();
            if (searchResult){
                return res.status(201).json(searchResult)
            }
        }else {
            const data = variant ? await Product.find({variant}): await Product.find();
            if (data){
                return res.status(201).json(data)
            }
        }
        return res.status(402).json({errors:{message: "something goes wrong"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }

}

module.exports = getAllProducts