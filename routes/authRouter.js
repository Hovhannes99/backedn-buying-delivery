const Router   = require('express')
const router =   new Router()
const controller = require('../composition/authControler');
const verifyUser = require('../composition/user/verifyUser')
const forgotPass = require('../composition/user/forgotPass')
const {signUp, signIn, emailValidation} = require("../middleware/signUpVerify")


router.post('/signUp', signUp(), controller.signUp);
router.post('/validation', verifyUser);
router.post("/forgotPass", emailValidation() ,forgotPass);
router.post('/signIn', signIn(), controller.signIn)
router.get('/users', controller.getUser)

module.exports = router