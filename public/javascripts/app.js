var app = angular.module('wanderlist', ['ngRoute', 'ui.bootstrap']);

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


app.controller('HomeController', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http){
  $scope.view = {};
  $scope.view.myInterval = 3000;
  $scope.active = 0;
  $scope.view.slides = [
    {
      image: 'http://www.nicdarkthemes.com/themes/love-travel/wp/demo-travel/wp-content/uploads/2015/05/love-travel-12-1920.jpg'
    },
    {
      image: 'http://www.beach-backgrounds.com/wallpapers/thumbnails/the-wallpaper-of-amaan-bungalows-in-the-zanzibar-island-1008x380-597.jpg'
    },
    {
      image: 'http://travelingmama.net/wp-content/uploads/2013/08/traveling-mama-road-italy-switzerland-71.jpg'
    }
  ];
}]);
