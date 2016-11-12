var nodemailer = require('nodemailer');
var config = require('./../config/secrets');
 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.GMAIL_USERNAME,
        pass: config.GMAIL_PASSWORD
    }
});
 

module.exports.sendMail = function(subject,message){
  var mailOptions = {
    from: config.MAIL_FROM,
    to: config.MAIL_TO,
    subject: subject,
    html: message
  };

  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      console.log(error);
      return -1;
    }
    console.log(info);
    return 1;
  });
}