const Router   = require('express')
const router =   new Router()
const controller = require('../composition/authControler');
const verifyUser = require('../composition/user/verifyUser')
const forgotPass = require('../composition/user/forgotPass')
const {signUp, signIn, emailValidation, resetPass} = require("../middleware/signUpVerify")
const resetPassword = require("../composition/user/resetPassword");


router.post('/signUp', signUp(), controller.signUp);
router.post('/validation', verifyUser);
router.post("/forgotPass", emailValidation() ,forgotPass);
router.post("/resetPass", resetPass() ,resetPassword);
router.post('/signIn', signIn(), controller.signIn)
router.get('/user', controller.getUser)
router.delete('/remove-user', controller.removeUser)

module.exports = router