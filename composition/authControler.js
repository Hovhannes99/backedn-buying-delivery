const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const json = require("express");
const mailer = require("./nodemailer")

class authController {
    async signUp(req, res) {
        try{
         const errors = validationResult(req)
         if (!errors.isEmpty() || !req.body.email || !req.body.pass){
             return res.status(400).json({message:"Errors time of registration"}, errors)
         }
         const {username, password, email} = req.body
         const candidate = await User.findOne({username});
         if (candidate){
             return res.status(400).json({message: "User already exist"})
         }
         const userRole = await Role.findOne({value:"ADMIN"})
         const hashPassword = bcrypt.hashSync(password, 8);
         const user = new User({username, password: hashPassword,email, role:"USER"});
         await user.save()
         const message = {
             from: "G-group < hovoohanjanyan9@gmail.com >",
             req: req.body.email,
             subscribe:"G-group, Congratulation you are registered",
             text:`This is your email and pass 
             Login: ${req.body.email} ,
             Pass: ${req.body.pass}
             `
         }
         mailer(message)
         return  res.json({message:"Registration successfully"})

        }catch (e){
            console.log(e, "awdawd");
            res.status(400).json({message:"Sign up Error"})
        }
    }
    async signIn(req, res) {
        try{

        }catch (e){
            console.log(e)
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