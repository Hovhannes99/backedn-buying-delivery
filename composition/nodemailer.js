const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "hovoohanjanyan9@gmail.com",
            pass: "1999RONALDO"
        }
    },
    {
        from: 'G-group, welcome < hovoohanjanyan9@gmail.com >',
    }
)

const mailer = message => {
    transport.sendMail(message, (err, info)=>{
        if (err){
            console.log(err, "Error")
        }else {
            console.log(info, "infooooo")
        }
    })
}

module.exports = mailer