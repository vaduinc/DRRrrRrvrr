var isInitReady = false;

var app = angular.module('DRRrrRrvrr', ['ngRoute','ngSanitize']);


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
