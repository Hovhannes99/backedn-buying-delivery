const Router   = require('express')
const router =   new Router()
const controller = require('../composition/authControler');
const {check} = require("express-validator")

router.post('/signUp', [
    check("username", "This row can't be empty").notEmpty(),
    check("email", "This row can't be empty").isEmail(),
    check("password", "Password will be more than 8 and less than 12 letters").isLength({min:8,max:12}),
], controller.signUp);
router.post('/signIn', controller.signIn)
router.get('/users', controller.getUsers)

module.exports = router