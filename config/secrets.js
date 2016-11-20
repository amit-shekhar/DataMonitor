var config = {}

config.PORT = process.env.PORT || 8080;
config.API_URL = "https://thawing-refuge-25082.herokuapp.com/";
config.API_URL_METHOD = "POST";
config.USERNAME = "username";
config.PASSWORD = "password";
config.MAIL_HOST = "smtp.gmail.com";
config.MAIL_PORT = 587;
config.MAIL_USERNAME =  "1q2w3v@gmail.com";
config.MAIL_PASSWORD =  "encrypted";
config.MAIL_FROM = "mailer@test.com";
config.MAIL_TO =  "test1@gmail.com , test2@gmail.com";
config.MAIL_FOOTER_TEXT = "put the footer text here";

module.exports = config;