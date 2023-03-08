const Orders = require("../../models/Order");


const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.headers;
        const order =  await Orders.findById({_id:id});
        if (order){
            return res.status(201).json(order)
        }
        return res.status(402).json({errors:{message: "something goes wrong"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }
}

module.exports = getOrderDetails