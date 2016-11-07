var request = require('request');

var data;
setInterval(getData,1000*60);

function getData(){
  console.log("hi");
  request('https://thawing-refuge-25082.herokuapp.com/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = body; 
      console.log(data);
    }
  });
}



module.exports.data = function(){
  return data;
};