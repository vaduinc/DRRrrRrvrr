var app = angular.module('routastic', ['ngRoute']);

app.controller('TabController', ['$location', function($location){
  var tc = this;
  tc.active = function(path){
    return !!$location.path().match(path);
  };
}]);

app.controller('ListController', ['Names', '$scope', function(Names, $scope){
  var vm = this;
  vm.names = Names;
  Names.get();
}]);

app.controller('AddController', ['Names', '$location', '$scope', function(Names, $location, $scope){
  var vm = this;
  vm.addName = function(){
    Names.push(vm.name);
    $location.path('/list');
  };
}]);

app.value('Names2', [
  "Andrew",
  "Norman",
  "Lauren",
  "Danai"
]);

app.service('Names', ['$http', function($http){
  var names = this;
  names.get = function(callback){
    $http.get('/names.json', {}).then(function(response){
      names.list = response.data;
      console.log(response);
      console.log(response.data);
      if(callback){
        callback();        
      }
    }, function(response){
      console.log(response);
    });
  };
  names.list = [];
}]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/list', {
      templateUrl: 'templates/list.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/add', {
      templateUrl: 'templates/add.html',
      controller: 'AddController',
      controllerAs: 'vm'
    })
    .otherwise({
      redirectTo: '/list'
    });
}]);
