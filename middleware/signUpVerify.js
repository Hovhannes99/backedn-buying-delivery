const {check} = require("express-validator");


class SignUpVerify {
    signUp(){
        return [
            check("username", "This row can't be empty").notEmpty(),
            check("email", "This row can't be empty").isEmail(),
            check("password", "Password will be more than 8 and less than 12 letters").isLength({min: 7, max: 12}),
        ]
    };
    signIn(){
        return [
            check("email", "This row can't be empty").isEmail(),
            check("password", "Password will be more than 8 and less than 12 letters").isLength({min: 7, max: 12}),
        ]
    };
    emailValidation(){
        return [
            check("email", "This row can't be empty").isEmail(),
        ]
    }

}

module.exports = new SignUpVerify()