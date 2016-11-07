var nodemailer = require('nodemailer');
 
var transporter = nodemailer.createTransport('smtps://aisforamit%40gmail.com:iloveitaly@smtp.gmail.com');
 

module.exports.sendMail = function(from,to,subject,message){
  var mailOptions = {
    from: from,
    to: to,
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