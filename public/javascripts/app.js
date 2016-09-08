var app = angular.module('wanderlist', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

console.log('booyah');

app.config(function($locationProvider, $routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/user', {
      templateUrl: 'views/templates/user.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .when('/admin', {
      templateUrl: 'views/templates/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin'
    })
    .when('/destination', {
      templateUrl: 'views/templates/desination.html',
      controller: 'DestinationController',
      controllerAs: 'destination'
    });
});


app.controller('HomeController', ['$scope', '$animate', '$routeParams', '$location', '$http', function($scope, $animate, $routeParams, $location, $http){

}]);
