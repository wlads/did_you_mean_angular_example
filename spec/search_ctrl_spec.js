describe("SearchCtrl",function(){
  var $scope = null;
    var $httpBackend = null;
  beforeEach(function(){
    module('app');
  });
  beforeEach(inject(function($rootScope, $controller,_$httpBackend_){
    $httpBackend = _$httpBackend_;
    $scope = $rootScope.$new();
    $controller('SearchCtrl',{$scope: $scope});
  }));

  describe("didYouMean",function(){
    it("repalces the searchTerm",function(){
      $scope.didYouMean('Yes I meant');
      expect($scope.searchTerm).toEqual('Yes I meant');
    });

    it("queries the server",function(){
      $httpBackend.expect("GET","./results.json?term=hello+world").respond(200,{didYouMean: null,products:[{name: 'foo'}]});
      $scope.didYouMean('hello world');
      $httpBackend.flush();
    });

  });

  describe("performSearch",function(){
    beforeEach(function(){
      $httpBackend.when("GET","./results.json?term=hello+world").respond(200,{didYouMean: null,products:[{name: 'foo'}]});
    });

    it("assigns products",function(){
      $scope.performSearch("hello world");
      $httpBackend.flush();
      expect($scope.products.length).toEqual(1);
    });
  });
});
