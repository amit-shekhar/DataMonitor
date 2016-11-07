"use strict";

angular.module("DataMonitor")
.controller("MainCtrl",function($scope,$http,$interval){
  $scope.name = "data table";

  $interval(function(){
    $http({
      method: "GET",
      url: "/data"
    }).then(function(response){
      $scope.data = response;
    }); 
  },1000*60);

});