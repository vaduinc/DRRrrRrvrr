var isInitReady = false;

var app = angular.module('DRRrrRrvrr', ['ngRoute','ngSanitize']);

//app.controller('TabController', ['$location', function($location){
//  //var tc = this;
//  //tc.active = function(path){
//  //  return !!$location.path().match(path);
//  //};
//}]);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/controller', {
          templateUrl: 'templates/controller.html'
    })
    .when('/directive', {
          templateUrl: 'templates/directive.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
