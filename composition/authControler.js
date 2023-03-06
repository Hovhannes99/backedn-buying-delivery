const User = require('../models/User')
const bcrypt = require('bcryptjs')
const mailer = require("./nodemailer");
const Token = require('../models/Token')
const  comparePasswords  = require("../utils/comparePasswords");
const createJWT = require("../utils/createJWT");
const verifyJWT = require("../utils/verifyJWT");
const { TOKEN_EXPIRY } = require("../config");
const hashPassword = require("../utils/hashPassword");
const generateRandomNumbers = require("../utils/generateRandomNumbers");
const validateEmail = require("../utils/emailValidation");

class authController {
    async signUp(req, res) {
        const generateVerificationCode = generateRandomNumbers()
        try{
         const {username, password, email, isVerified} = req.body
          const isCorrectEmail = validateEmail(email);
         if (!isCorrectEmail){
             return res.status(400).json({message: "Email is not correct"})
         }
            const candidate = await User.findOne({email});
         if (candidate){
             return res.status(400).json({message: "User already exist"})
         }
         const isAdminRole = email === "ggroupmarcket1001@gmail.com" ? "ADMIN" : "USER"

         const hashPass = hashPassword(password, 7);
         const hashCode = bcrypt.hashSync(`${generateVerificationCode}`)
         const user = new User({username, password: hashPass,email, role:`${isAdminRole}`, isVerified});
         const message = {
             from: "ggroupmarcket1001@gmail.com",
             to: email,
             subscribe:"G-group, Congratulation you are registered",
             text:`This is your confirmation code: ${generateVerificationCode}`,
         }
        await mailer(message, res);
        await user.save();
        await new Token({email, token:hashCode}).save()
        return res.status(200).json({data: {isSignUp:true}})
        }catch (e){
            res.status(400).json({error:e})
        }
    }
    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(402).json({ errors: { message: "User not found" } });
            }

            if (!user.isVerified) {
                return res
                    .status(401)
                    .json({ errors: { message: "Account is not verified" } });
            }

            const passwordIsCorrect = await comparePasswords(password, user.password);

            if (!passwordIsCorrect) {
                return res
                    .status(403)
                    .json({ errors: { message: "Password or email is incorrect" }});
            }

            const token = createJWT(user.email, user._id, TOKEN_EXPIRY, res);
            await verifyJWT(token, res);
            await Token.findOneAndDelete({ email : user.email })
            res.status(200).json({ user, token });
        } catch (err) {
            res.status(500).json({ errors: [{ message: err.message }] });
        }
    }
    async getUser(req, res){
        try {
            const {token}  = req.headers;
             if (token){
                 const notBearer = token.split(" ")[1];

                 const decoding = await verifyJWT(notBearer, res);
                if (decoding._id){
                    const user = await User.findOne({_id:decoding._id});
                    return res.json({user});
                }else {
                   return res.json({ errors: { message: "wrong Idd" }})
                }
            }else {
                res.status(400).json({ errors: {message: "token is not correct"}})
            }
        }catch (error){
            res.json(error);
           return res.status(400).json({message:"Users Error"})
        }
    }
}

module.exports = new authController()