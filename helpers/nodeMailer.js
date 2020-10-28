const nodemailer = require("nodemailer");

//let testAccount = await nodemailer.createTestAccount();


const enviarEmail = (req, res, de, para, asunto, texto ) =>{

    // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

const mailOptions = {
    from: de,
    to: para,
    subject: asunto,
    text: texto,
}


 transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.status(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).json(req.body);
    }
});

}

module.exports = {
    enviarEmail
}

  