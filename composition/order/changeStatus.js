const Order = require("../../models/Order");

const changeStatus = async (req, res) => {
    try{
        const {id, status} = req.body;
        await Order.findOneAndUpdate({_id: id}, {$set: {status}});
        const newOrderStatus = await Order.findOne({_id: id})
        return res.status(201).json(newOrderStatus)
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = changeStatus