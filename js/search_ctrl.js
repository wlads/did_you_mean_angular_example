var app = angular.module("app",[]);

app.service("Search",function($http){
  return {
    query: function(params,successCallback,errorCallback){
      requestPayload = {method: "GET", url: "./results.json"}
      requestPayload.params = params;
      $http(requestPayload).success(function(data,status){
        if(successCallback){
          successCallback(data,status);
        }
      }).error(function(data,status){
        if(errorCallback){
          errorCallback(data,status);
        }
      });
    }
  };
});

app.controller('SearchCtrl',function($scope, Search){
  $scope.products = [];
  $scope.didYouMeanTerm = null
  $scope.didYouMean = function(newTerm){
    $scope.searchTerm = newTerm;
    $scope.performSearch(newTerm)
  };

  $scope.performSearch = function(term){
    search = Search.query({term: term},function(data,status){
      $scope.products = data.products;
      $scope.didYouMeanTerm = data.didYouMean;
    });
  };
});
