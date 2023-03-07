const Router   = require('express')
const router =   new Router();
const createOrder = require('../composition/order/createOrder')
const getOrders = require('../composition/order/getAllOrders')



router.post("/createOrder", createOrder);
router.post("/orders", getOrders);



module.exports = router