angular.module('capitalApp', ['apiDataService', 'dataCompile', 'ngRoute', 'ngAnimate'])

.config(['$locationProvider','$routeProvider',
  function($locationProvider, $routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "./partials/home.html"
      })
      .when("/countries", {
        templateUrl: "./partials/countries.html",
        controller: "countriesCtrl",
      })
      .when("/countries/:countryCode", {
        templateUrl: "./partials/details.html",
        controller: "detailsCtrl",
      })
      .otherwise({
         redirectTo: '/home'
      });
}]);
