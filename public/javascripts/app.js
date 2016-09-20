var app = angular.module('wanderlist', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngResource']);

console.log('booyah');

app.factory('cityFactory', function(){
  var cityObject = {};
  cityObject.city = ['New York', 'Miami', 'San Francisco', 'Denver', 'Seattle'];
  return cityObject.city;
})

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
    $http({
      method: 'POST',
      url: '/users',
      data: user
    }).then(function(data){
      $scope.view.users = data;
      var id = $scope.view.users.data[0];
      $location.url('/users/' + id + '/view');
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

app.controller('UserViewController', ['$scope', '$routeParams', '$location', '$http', '$filter', 'cityFactory', function($scope, $routeParams, $location, $http, $filter, cityFactory){

  var id = $routeParams.id;
  var city;
  var key;
  var fare;
  $scope.view = {};
  $scope.view.editValue = true;
  $scope.view.cities = cityFactory;

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.view.depDate = $filter()

  $http({
    method: 'GET',
    url: '/users/' + id,
  }).success(function(res){
    $scope.view.users = res;
  })

  $http({
    method: 'GET',
    url: '/getenv',
  }).success(function(res){
    key = res;
  })

  $scope.view.destCity = function(val) {
    switch(val) {
      case 'New York':
        city = 'LGA';
        break;
      case 'San Francisco':
        city = 'SFO';
        break;
      case 'Seattle':
        city = 'SEA';
        break;
      case 'Denver':
        city = 'DEN';
        break;
      default:
        city = 'MIA';
    }
    $http({
      method: "GET",
      url: 'http://terminal2.expedia.com/x/mflights/search?departureDate='+$scope.view.depDate+'&returnDate='+$scope.view.arrDate+'&departureAirport=AUS&arrivalAirport='+city+'&apikey='+key
    }).then(function(res){
      fare = res.data.offers[0].averageTotalPricePerTicket.formattedPrice;
      $(".flightInfo").append("<tr><td>Austin to " + val + ": " + fare + "</td></tr>");
    })
  }



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

}])
