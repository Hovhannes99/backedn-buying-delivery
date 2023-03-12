const Orders = require("../../models/Order");


const getAllOrders = async (req, res) => {
    try {
        const { id, role } = req.body;
          if (role === "ADMIN"){
              const orders =  await Orders.find();
              if (orders){
                  return res.status(201).json(orders)
              }
          }
          if (role === "USER"){
              const order = await Orders.find({id})
              if (order){
                  return res.status(201).json(order)
              }
          }
        return res.status(402).json({errors:{message: "something goes wrong"}})
    }catch (e){
        return res.status(500).json({errors: {message: e}})
    }

}

module.exports = getAllOrders