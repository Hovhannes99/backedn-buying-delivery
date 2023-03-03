const Router   = require('express')
const router =   new Router();
const upload = require("../middleware/upload")
const createProduct = require("../composition/product/createProduct")
const getProductId = require("../composition/product/getProduct");
const getAllProducts = require("../composition/product/getAllProducts");
const editProduct = require("../composition/product/editProduct");
const deleteProduct = require("../composition/product/deleteProduct");
const searchProduct = require("../composition/product/searchProduct");


router.post('/create',upload.single('imagesSrc'), createProduct);
router.get('/product', getProductId);
router.get('/products', getAllProducts);
router.put('/edit',editProduct);
router.delete('/removeProduct', deleteProduct);
router.get('/search', searchProduct);


module.exports = router
