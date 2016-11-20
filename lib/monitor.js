var request = require('request');
var mailer = require('./mailer');
var config = require('./../config/secrets');

var data;
var threshold_docs = [];

getData();
setInterval(getData,1000*15);

function getData(){
  var request_options = {
    url: config.API_URL,
    method: config.API_URL_METHOD,
    auth: {
      user: config.USERNAME,
      pass: config.PASSWORD
    }
  }
  request(request_options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      data = body; 
      process_docs(JSON.parse(data).docs);
    }
  });
}



function process_docs(docs){
  var unique_models = get_unique_models(docs);
  var unique_bins = get_unique_bins(docs);
  var changes = false;

  for(var i = 0 ; i < unique_models.length ; i++ ){
    for(var j = 0 ;  j < unique_bins.length ; j++ ){
      var model = unique_models[i];
      var bin = unique_bins[j];
      var count = get_docs_count(docs,model,bin);
      if(count < 4 && threshold_docs.indexOf(combine(model,bin)) == -1){
        threshold_docs.push(combine(model,bin));
        changes = true;
      }else if( count >= 4 && threshold_docs.indexOf(combine(model,bin)) != -1 ){
        threshold_docs.splice(threshold_docs.indexOf(combine(model,bin)),1);
      }
    }
  }

  if(changes){
    mailer.sendMail("Threshold notification",docs,get_threshold_models(),get_threshold_bins());
  }
}

function get_threshold_models(){
  return threshold_docs.map(function(obj){
    return obj.split(' ')[0];
  });
}

function get_threshold_bins(){
  return threshold_docs.map(function(obj){
    return obj.split(' ')[1];
  });
}

function combine(model,bin){
  return model.toString() + " " + bin.toString();
}
  
function get_unique_models(docs){
  var output = [];
  for(var i = 0 ; i < docs.length; i++){
    if(output.indexOf(docs[i].model) == -1){
      output.push(docs[i].model);
    }
  }
  return output;
}

function get_unique_bins(docs){
  var output = [];
  for(var i = 0 ; i < docs.length ; i++){
    if(output.indexOf(docs[i].fq_bin) == -1){
      output.push(docs[i].fq_bin);
    }
  }
  return output;
}


function get_docs_count(docs,model,fq_bin){
  return docs.filter(function(obj){
    return obj.model == model && obj.fq_bin == fq_bin;
  }).length;
}



module.exports.data = function(){
  return data;
};