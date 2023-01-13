const Router   = require('express')
const router =   new Router()
const controller = require('../composition/authControler');
const verifyUser = require('../composition/user/verifyUser')
const validation = require("../middleware/signUpVerify")


router.post('/signUp', validation.signUp, controller.signUp);
router.post('/validation', verifyUser);
router.post("/forgotPass", verifyUser)
router.post('/signIn', validation.signIn,controller.signIn)
router.get('/users', controller.getUser)

module.exports = router