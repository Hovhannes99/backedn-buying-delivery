const  User = require("../../models/User");
const numberGenerator = require("number-generator");
const mailer = require("../nodemailer");
const bcrypt = require("bcryptjs");
const Token = require("../../models/Token");
const generateRandomNumbers = require("../../utils/generateRandomNumbers");

const forgotPass = async (req, res) => {
    const generateVerificationCode = generateRandomNumbers()
    try {
        const { email } = req.body;
        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message:"email is not found"})
        }
        const message = {
            from: "ggroupmarcket1001@gmail.com",
            to: email,
            subscribe:"G-group, Congratulation you are registered",
            text:`This is your confirmation code: ${generateVerificationCode}`,
        }
        const hashCode = bcrypt.hashSync(`${generateVerificationCode}`)
         await new Token({email, token:hashCode}).save()
         await User.findOneAndUpdate({ email }, { $set: { isVerified: false } })
        await mailer(message, res);
        return res.status(200).json({message: {emailSent: true}})
    } catch (err) {
        return res.send(err.message);
    }
};

module.exports = forgotPass;
