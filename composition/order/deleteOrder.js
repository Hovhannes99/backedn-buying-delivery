const Order = require("../../models/Order");


const deleteOrder = async (req, res) => {
    try{
        const {id} = req.headers;
        const newOrder = await Order.findByIdAndDelete({_id: id });
        return res.status(201).json({newOrder, isRemoved: true})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = deleteOrder