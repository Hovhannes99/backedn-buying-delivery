const  Email = require("../../models/Email");
const numberGenerator = require("number-generator");
const mailer = require("../nodemailer");

const forgotPass = async (req, res) => {
    const generateVerificationCode = numberGenerator.aleaRNGFactory(10).uInt32()
    try {
        const { email } = req.body;

        const user = await Email.findOne({email})

        if (user){
            return res.status(400).json({message:"email is not found"})
        }
        // const message = {
        //     from: "ggroupmarcket1001@gmail.com",
        //     to: email,
        //     subscribe:"G-group, Congratulation you are registered",
        //     text:`This is your confirmation code: ${generateVerificationCode}`,
        // }
        // await mailer(message, res);
        return res.status(200).json({message: {emailSent: true}})
    } catch (err) {
        return res.send(err.message);
    }
};

module.exports = forgotPass;
