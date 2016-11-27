var nodemailer = require('nodemailer');
var config = require('./../config/secrets');
 
var transporter = nodemailer.createTransport({
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    auth: {
        user: config.MAIL_USERNAME,
        pass: config.MAIL_PASSWORD
      }
});


function make_mail_body(docs,threshold_docs){
  var used = [];
  var temp = docs.filter(function(obj){
    if ( used.indexOf(combine(obj.model,obj.fq_bin)) == -1){
      used.push(combine(obj.model,obj.fq_bin));
      return threshold_docs.includes(combine(obj.model,obj.fq_bin));
    }
  });

  var message = "";
  message += "<div>The below list of switch is below threshold - </div>"
  message += "<table class='table table-bordered>'";
  message += "<thead>";
  message += "<tr><th style='border:1px solid grey;padding:10px;'>Model</th><th style='border:1px solid grey;padding:10px;'>Serial</th><th style='border:1px solid grey;padding:10px;'>Room</th><th style='border:1px solid grey;padding:10px;'>Site</th></tr>";
  message += "</thead>";
  message += "<tbody>";
  for(var i = 0 ; i < temp.length; i++){
    message += "<tr><td style='border:1px solid grey;padding:10px;'>"+temp[i].model+"</td><td style='border:1px solid grey;padding:10px;'>"+temp[i].serial_id+"</td><td style='border:1px solid grey;padding:10px;'>"+temp[i].room+"</td><td style='border:1px solid grey;padding:10px;'>"+temp[i].site+"</td></tr>";
  }
  message += "</tbody>";
  message += "</table>";
  message += "<div>" + config.MAIL_FOOTER_TEXT + "</div>"
  return message;
}

function combine(model,bin){
  return model.toString() + " " + bin.toString();
}
 

module.exports.sendMail = function(subject,docs,threshold_docs){
  var mailOptions = {
    from: config.MAIL_FROM,
    to: config.MAIL_TO,
    subject: subject,
    html: make_mail_body(docs,threshold_docs)
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