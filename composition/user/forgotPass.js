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
            return res.status(400).json({message:"EMAIL_NOT_FOUND"})
        }
        const message = {
            from: "ggroupmarcket1001@gmail.com",
            to: email,
            subscribe:"G-group Ընկերություն",
            text:`Սա ձեր հաստատման կոդը է: ${generateVerificationCode}`,
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
