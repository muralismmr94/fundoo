/***************************************************************************
 * Execution : 1.default node     cmd>node server.js
 *             2.if nodemon installed  cmd> npm start
 * purpose  : It is used to sending the mails to particular mail
 * @description
 * @file    : sendmailer.js
 * @overview :In this class is used to sending the mails of the particular user.
 * @author  : Murali s <muralismmr94@gmail.com>
 * @version :1.0
 * 
 ***************************************************************************/

/**
 * requiring the node mailer
 */
require('dotenv').config();
const nodemailer = require('nodemailer');
/**
 * @description : exporting the sendmailer
 * @param {url , mailaddress} : url is used to reset the password and mailsender is used for sending mail
 */
exports.sendEmailer = (url, mailaddress) => {
    /**
     * creating the  nodemailer transport object.
     */
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });
    /**
     * setting the mail options .
     */
    const mailOptions = {
        from: process.env.EMAIL,
        to: mailaddress,
        subject: ' password reset link ',
        text: 'Please go through the e-mail verifiction link provided in this mail:\n\n' + url
    };
    /**
     * sending the mail and giving the callback function.
     */
    transporter.sendMail(mailOptions, (err, info) => {

        if (err)
            console.log("error on sending mail ", err);

        else
            console.log('result of sending mail ', info);
    });

}
