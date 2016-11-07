var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");


var routes = require("./lib/routes");
var config = require("./config/secrets");


var app = express();

var server = http.createServer(app);

server.listen(config.PORT, function(){
  console.log("server is running .....  ");
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/",routes);
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));


require("./lib/monitor");