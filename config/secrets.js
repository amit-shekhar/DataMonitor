var config = {}

config.PORT = process.env.PORT || 8080;
config.API_URL = "https://thawing-refuge-25082.herokuapp.com/";
config.API_URL_METHOD = "POST";
config.USERNAME = "username";
config.PASSWORD = "password";
config.MAIL_HOST = "smtp.gmail.com";
config.MAIL_PORT = 587;
config.MAIL_USERNAME =  "";
config.MAIL_PASSWORD =  "";
config.MAIL_FROM = "";
config.MAIL_TO =  "test1@gmail.com , mr.profficient@gmail.com , test2@gmail.com";
config.MAIL_FOOTER_TEXT = "put the footer text here";

module.exports = config;