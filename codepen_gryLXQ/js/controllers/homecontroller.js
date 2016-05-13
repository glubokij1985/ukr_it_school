App.controller('homeController', ['$scope', '$http', function($scope, $http){
  var me = this;
  // me.product = {};
  // me.product.id = 1;
  // me.product.title = 'Auto';
  $scope.product = {};

  $scope.getProduct = function(){
    
  };

  $scope.products = [];

  me.init = function(){
    for(var i = 0; i < 5; i++){
      var product = {
        id: i,
        title: 'Prod ' + i
      };
      $scope.products.push(product);
    }
  };

  $scope.removeProduct = function(id){
    for(var i = 0; i < $scope.products.length; i++){
      if($scope.products[i].id == id){
        $scope.products.splice(i, 1);
      }
    }
  };

  $scope.addProduct = function(id, title){
    $scope.products.push($scope.product);
    $scope.product = {};
  }
}]);