const nodemailer=require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');

exports.sendEMailFunction = (url,email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.email,
            pass:process.env.pass
          },
    });
    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Chat app password reset link ',      
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n'+url
    };
    transporter.sendMail(mailOptions,(err,info) => {
       
        if (err){   
            console.log("error on sending mail ", err)
        }
        else
            console.log('result of sending mail ',info);
    });
    
}
