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
    .when('/documentlist', {
          templateUrl: 'templates/documentlist.html'
    })
    .when('/documentviewer', {
          templateUrl: 'templates/documentviewer.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
