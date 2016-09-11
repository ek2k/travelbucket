
var app = angular.module('wanderlist', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

console.log('booyah');

app.config(function($locationProvider, $routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    })
    .when('/signup', {
      templateUrl: '/views/templates/signup.html',
      controller: 'SignupController',
      controllerAs: 'signup'
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


app.controller('HomeController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

  $scope.view = {};

}]);

app.controller('LoginController', ['$scope', 'routeParams', '$location', '$http',  function($scope, $routeParams, $location, $http){

  $scope.view = {};

  $scope.view.login = function(user) {
    console.log(user);
    $http({
      method: 'POST',
      url: '/login',
      data: user
    }).success(function(){
      $location.url('/users');
    })
  }

}]);

app.controller('SignupController', ['$scope', function($scope){

}]);
