const User = require('../models/User')
const Email = require('../models/Email')
const bcrypt = require('bcryptjs')
const mailer = require("./nodemailer");
const numberGenerator = require("number-generator");
const Token = require('../models/Token')
const  comparePasswords  = require("../utils/comparePasswords");
const createJWT = require("../utils/createJWT");
const verifyJWT = require("../utils/verifyJWT");
const { TOKEN_EXPIRY } = require("../config");

class authController {
    async signUp(req, res) {
        const generateVerificationCode = numberGenerator.aleaRNGFactory(10).uInt32()
        try{
         const {username, password, email, isVerified} = req.body
         const candidate = await User.findOne({email});
         if (candidate){
             return res.status(400).json({message: "User already exist"})
         }
         // const userRole = await Role.findOne({value:"ADMIN"})
         const hashPassword = bcrypt.hashSync(password, 7);
         const hashCode = bcrypt.hashSync(`${generateVerificationCode}`)
         const user = new User({username, password: hashPassword,email, role:"USER", isVerified});
         const message = {
             from: "ggroupmarcket1001@gmail.com",
             to: email,
             subscribe:"G-group, Congratulation you are registered",
             text:`This is your confirmation code: ${generateVerificationCode}`,
         }
        await mailer(message, res);
        await user.save();
        await new Token({email, token:hashCode}).save()
        }catch (e){
            res.status(400).json({message:"Sign up Error"})
        }
    }
    async signIn(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ errors: [{ message: "User not found" }] });
            }

            if (!user.isVerified) {
                return res
                    .status(401)
                    .json({ errors: [{ message: "Account is not verified" }] });
            }

            const passwordIsCorrect = await comparePasswords(password, user.password);

            if (!passwordIsCorrect) {
                return res
                    .status(403)
                    .json({ errors: [{ message: "Password is incorrect" }] });
            }

            const token = createJWT(user.email, user._id, TOKEN_EXPIRY, res);
            await verifyJWT(token, res);

            res.status(200).json({ user, token });
        } catch (err) {
            res.status(500).json({ errors: [{ message: err.message }] });
        }
    }
    async getUser(req, res){
        try {
            res.json("we in to json");
        }catch (error){
            res.json(error);
            res.status(400).json({message:"Users Error"})

        }
    }
}

module.exports = new authController()