var app = angular.module('wanderlist', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'angularSpinner']);

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
    .when('/users/:id/dashboard', {
      templateUrl: 'views/templates/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard'
    });
});


app.controller('DashboardController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){

  $scope.view = {};

  var id = $routeParams.id;

  $http({
    method: 'GET',
    url: '/users/' + id,
  }).success(function(res){
    $scope.view.users = res;
  })

}])

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
      console.log(res);
      $location.url('/:id/view');
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

app.controller('UserViewController', ['$scope', '$routeParams', '$location', '$http', '$filter', 'cityFactory', 'uibDateParser', function($scope, $routeParams, $location, $http, $filter, cityFactory, uibDateParser){

  var id = $routeParams.id;
  var city;
  var key;
  var fare;
  var pic;
  $scope.view = {};
  $scope.view.editValue = true;
  $scope.view.showFlightInfo = true;
  $scope.view.cities = cityFactory;
  $scope.view.spinner = false;

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
    var depDate = (moment($scope.view.depDate).format("YYYY-MM-DD"));
    var arrDate = (moment($scope.view.arrDate).format("YYYY-MM-DD"));
    var depTime1;
    var depTime2;
    var arrTime1;
    var arrTime2;
    var airline1;
    var airline2;
    $('.flightInfo').html('');
    $scope.view.destination = val;
    $scope.view.showFlightInfo = false;
    $scope.view.spinner = false;

    switch(val) {
      case 'New York':
        city = 'LGA';
        pic = 'https://crossorigin.me/http://www.fourseasons.com/content/dam/fourseasons/images/web/NYF/NYF_395crop_1280x486.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg';
        break;
      case 'San Francisco':
        city = 'SFO';
        pic = 'https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200';
        break;
      case 'Seattle':
        city = 'SEA';
        pic = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Space_Needle002.jpg';
        break;
      case 'Denver':
        city = 'DEN';
        pic = 'https://lonelyplanetimages.imgix.net/a/g/hi/t/1da32e09c1497a907cda4479049e6b2b-denver.jpg?sharp=10&vib=20&w=1200';
        break;
      default:
        city = 'MIA';
        pic = 'https://images-resrc.staticlp.com/S=W1000M,H700M/O=85/http://media.lonelyplanet.com/a/g/hi/t/da5189f3995d3c908d9cfa633ba70c93-crandon-park.jpg';
    }
    $http({
      method: "GET",
      url: 'http://terminal2.expedia.com/x/mflights/search?departureDate='+depDate+'&returnDate='+arrDate+'&departureAirport=AUS&arrivalAirport='+city+'&apikey='+key
    }).then(function(res){
      console.log(res);
      $scope.view.spinner = true;
      for (var i = 0; i < 6; i++) {
        var leg1 = res.data.offers[i].legIds[0]
        var leg2 = res.data.offers[i].legIds[1]
        for (var x = 0; x < res.data.legs.length; x++) {
          if(leg1 === res.data.legs[x].legId) {
            depTime1 = moment(res.data.legs[x].segments[0].departureTimeRaw).format('MM/DD/YYYY, h:mm:ss a');
            arrTime1 = moment(res.data.legs[x].segments[(res.data.legs[x].segments.length)-1].arrivalTimeRaw).format('MM/DD/YYYY, h:mm:ss a');
            airline1 = res.data.legs[x].segments[0].airlineName;
          }
          if(leg2 === res.data.legs[x].legId) {
            depTime2 = moment(res.data.legs[x].segments[0].departureTimeRaw).format('MM/DD/YYYY, h:mm:ss a');
            arrTime2 = moment(res.data.legs[x].segments[(res.data.legs[x].segments.length)-1].arrivalTimeRaw).format('MM/DD/YYYY, h:mm:ss a');
            airline2 = res.data.legs[x].segments[0].airlineName;

          }
        }
        fare = res.data.offers[i].averageTotalPricePerTicket.formattedPrice;

        $(".flightInfo").append(
          '<div class="col-sm-4"><div class="card text-center"><img class="card-img-top img-responsive" src=' + pic + '><div class="card-block"><ul class="list-group list-group-flush"><li class="list-group-item">Departing<br> '+airline1+'<br>Dep: '+depTime1+'<br>Arr: '+arrTime1+'</li><li class="list-group-item">Returning<br> '+airline2+'<br>Dep: '+depTime2+'<br>Arr: '+arrTime2+'</li><li class="list-group-item">Price: '+fare+'  <button type="button" class="btn btn-primary btn-small save"><a href="#/users/1/dashboard">Save</a></button></li></ul></div></div>'
        );
      }
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
