const Router   = require('express')
const router =   new Router();
const createOrder = require('../composition/order/createOrder')
const getOrders = require('../composition/order/getAllOrders')
const getOrderDetails = require('../composition/order/getOrderDetails')
const changeStatus = require('../composition/order/changeStatus')
const deleteOrder = require('../composition/order/deleteOrder')



router.post("/createOrder", createOrder);
router.put('/change-status', changeStatus)
router.post("/orders", getOrders);
router.get('/order', getOrderDetails)
router.delete('/remove-order', deleteOrder)



module.exports = router