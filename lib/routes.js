var router = require("express").Router();
var path = require("path");
var monitor = require(path.join(__dirname + "/monitor"));

router.get("/",function(request,response){
  response.sendFile(path.join(__dirname + "/../public/index.html"));
});


router.get("/data",function(request,response){
  console.log(monitor.data());
  response.send(monitor.data());
});

module.exports = router;