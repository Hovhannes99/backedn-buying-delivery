const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const {json} = require("express");

class authController {
    async signUp(req, res) {
        try{
         const errors = validationResult(req)
         if (!errors.isEmpty()){
             return res.status(400).json({message:"Errors time of registration"}, errors)
         }
         const {username, password, email} = req.body
         const candidate = await User.findOne({username});
         if (candidate){
             return res.status(400).json({message: "User already exist"})
         }
         const userRole = await Role.findOne({value:"ADMIN"})
         const hashPassword = bcrypt.hashSync(password, 8);
         const user = new User({username, password: hashPassword,email, roles:[userRole]});
         await user.save()
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