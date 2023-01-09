const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const mailer = require("./nodemailer")

class authController {
    async signUp(req, res) {
        try{

         const {username, password, email} = req.body
         const candidate = await User.findOne({email});
         if (candidate){
             return res.status(400).json({message: "User already exist"})
         }
         // const userRole = await Role.findOne({value:"ADMIN"})
         const hashPassword = bcrypt.hashSync(password, 8);
         const user = new User({username, password: hashPassword,email, role:"USER"});
         await user.save()
         const message = {
             from: "ggroupmarcket1001@gmail.com",
             to: email,
             subscribe:"G-group, Congratulation you are registered",
             text:`G-group, this is your email and pass
             Login: ${email} ,
             Pass: ${password}
            `,
         }
        mailer(message, res);

        }catch (e){
            res.status(400).json({message:"Sign up Error"})
        }
    }
    async signIn(req, res) {
        try{

        }catch (e){
            res.status(400).json({message:"Sign in Error"})
        }
    }
    async getUsers(req, res){
        try {
            res.json("we in to json");
        }catch (error){
            res.json(error);
            res.status(400).json({message:"Users Error"})

        }
    }
}

module.exports = new authController()