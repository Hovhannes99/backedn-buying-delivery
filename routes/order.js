const Router   = require('express')
const router =   new Router();
const createOrder = require('../composition/order/createOrder')



router.post("/createOrder", createOrder);



module.exports = router