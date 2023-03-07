const Orders = require("../../models/Order");


const getAllOrders = async (req, res) => {
    try {
        const { id } = req.body;
            const orders =  await Orders.find({id});
           if (orders){
               return res.status(201).json(orders)
           }
        return res.status(402).json({errors:{message: "something goes wrong"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }

}

module.exports = getAllOrders