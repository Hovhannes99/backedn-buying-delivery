const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport(
    {
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "gurgen.karapetyan.85@bk.ru",
            pass: "H1mjzL098xRYeSLJW4Bt"
        }
    },
    {
        from: 'G-group, welcome <gurgen.karapetyan.85@bk.ru>',
    }
)

const mailer = message => {
    transport.sendMail(message, (err, info)=>{
        if (err){
            console.log(err, "Error")
           return err
        }else {
            console.log(info, "infooooo")

        }
    })
}

module.exports = mailer