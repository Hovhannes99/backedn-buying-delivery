const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "ggroupmarcket1001@gmail.com",
            pass: "c t e i v s x q p v f u c x r e"
        }
    },
    {
        from: 'G-group, welcome <ggroupmarcket1001@gmail.com>',
    }
)

const mailer = (message,  res) => {
    transport.sendMail(message, (err, info)=>{
        if (err){
           return  res.status(400).json({message:"Sign up Error", err})
        }else {
            return  res.status(200).json({message:"Registration successfully ", info})

        }
    })
}

module.exports = mailer