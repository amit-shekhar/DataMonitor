"use strict";

angular.module("DataMonitor")
.controller("MainCtrl",function($scope,$http,$interval){
  $scope.name = "Data Monitor";

  function getData(){
    $http({
      method: "GET",
      url: "/data"
    }).then(function(response){
      $scope.docs = response.data.docs;
    }); 
  }

  getData();

  $interval(function(){
    getData();
  },1000*15);

  


  $scope.get_count = function(model,fq_bin){
    return $scope.docs.filter(function(obj){
     return obj.model === model && obj.fq_bin === fq_bin;
    }).length;
  };

  $scope.select_docs = function(model,fq_bin){
    $scope.selected_docs = $scope.docs.filter(function(obj){
     return obj.model === model && obj.fq_bin === fq_bin;
    });
  };

});