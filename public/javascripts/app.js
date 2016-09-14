// var app = angular.module('wanderlist', ['ui.router', 'ngResource', 'wanderlist.services', 'ui.bootstrap']);
//
// app.config(function($stateProvider){
//   $stateProvider.state('users', {
//     url: '/users',
//     templateUrl: 'views/templates/user.html',
//     controller: 'UserController'
//   }).state('viewUser', {
//     url: '/users/:id/view',
//     templateUrl: 'views/templates/userView.html',
//     controller: 'UserViewController'
//   }).state('newUser', {
//     url: '/users/new',
//     templateUrl: 'views/templates/signup.html',
//     controller: 'SignupController'
//   }).state('editUser', {
//     url: '/users/edit',
//     templateUrl: 'views/templates/editUser.html',
//     controller: 'UserController'
//   });
// }).run(function($state){
//   $state.go('users');
// })
//
//
//
// app.controller('UserController', function($scope, $state, $window, User){
//   $scope.view = {};
//   $scope.view.users = User.query();
//   console.log($scope.view.users);
// })
//
// app.controller('UserViewController', function($scope, $stateParams, User){
//   $scope.view = {};
//   $scope.view.user = User.get({id: $stateParams.id});
// })
//
// app.controller('SignupController', function($scope, $state, $stateParams, User){
//   $scope.view = {};
//   $scope.view.user = new User();
//   $scope.view.signup = function() {
//     $scope.view.user.$save(function(){
//       $state.go('users');
//     })
//   }
// })



var app = angular.module('wanderlist', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngResource']);

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
    .when('/users/signup', {
      templateUrl: '/views/templates/signup.html',
      controller: 'SignupController',
      controllerAs: 'signup'
    })
    .when('/users', {
      templateUrl: 'views/templates/user.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .when('/users/:id/view', {
      templateUrl: 'views/templates/userView.html',
      controller: 'UserController',
      controllerAs: 'userView'
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

app.controller('LoginController', ['$scope', '$routeParams', '$location', '$http',  function($scope, $routeParams, $location, $http){

  $scope.view = {};

  $scope.view.login = function(user) {
    $http({
      method: 'GET',
      url: '/login',
      data: user
    }).success(function(res){
      $location.url('/users');
    })
  }

}]);

app.controller('SignupController', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){

  $scope.view = {};

  $scope.view.signup = function(user) {
    console.log(user);
    $http({
      method: 'POST',
      url: '/users',
      data: user
    }).success(function(){
      $location.url('/users');
    })
  }

}]);

app.controller('UserController', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){

  $scope.view = {};

  $http({
    method: 'GET',
    url: '/users',
  }).success(function(res){
    $scope.view.users = res;
  })
}])

app.controller('UserViewController', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){

  var id = $routeParams.id;
  $scope.view = {};
  $scope.view.editValue = true;

  $scope.view.editUser = function() {
    $scope.view.editValue = !$scope.view.editValue;
  }

  $scope.view.change = function(data) {
    console.log(data);
    $http({
      method: 'POST',
      url: '/users/' + id + '/edit',
      data: data
    }).success(function() {
      $scope.view.editValue = !$scope.view.editValue;
    })
  }


  $http({
    method: 'GET',
    url: '/users/' + id,
  }).success(function(res){
    $scope.view.users = res;
  })

}])
