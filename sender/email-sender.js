const nodemailer = require('nodemailer')
const { account } = require('../config')


const transporter = nodemailer.createTransport(account);

function send({ to,subject,html }){
    let mailOptions = {};
    mailOptions.from = account.from;
    mailOptions.to = to;
    mailOptions.subject = subject;
    mailOptions.html = html;
    return new Promise((resolve,reject) =>{
        transporter.sendMail(mailOptions,(error, info) =>{
            if(error){
                reject(error)
            }else{
                console.log(`Message send:%s`, info.messageId)
                resolve(info)
            }
        })
    });    å
}

module.exports.send = send;