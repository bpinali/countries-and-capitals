angular.module('capitalApp')

.controller('mainCtrl',['$scope','countryData', function($scope, countryData) {}])

.controller('countriesCtrl', ['$scope','$location','$filter','countryData', '$q', function($scope, $location, $filter, countryData, $q) {
  'use strict';

  var toString = Object.prototype.toString;

  $q.when(countryData.countries).then(function(result){
    if(toString.call(countryData.countries)=='[object Object]') {
      countryData.countries = result.geonames;
    }
    $scope.countries = countryData.countries;
  });

  $scope.showDetail = function(country) {
    $location.path('/countries/'+country.countryCode);
  };

  angular.forEach($scope.countries, function (country) {
    country.areaInSqKm = parseFloat(country.areaInSqKm);
    country.population = parseFloat(country.population);
  });

  $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };


}])

.controller('detailsCtrl', ['$scope','$route','countryData', function($scope, $route, countryData) {

  countryData.getCountry($route.current.params.countryCode).then(function(result) {
    $scope.country=result[0];
  });
  countryData.getCapitals($route.current.params.countryCode).then(function(result) {
    $scope.capital = result;
    $scope.capitalPopulation = $scope.capital.population;
  });

  countryData.getNeighbors($route.current.params.countryCode).then(function(result) {
    $scope.neighbors = result.geonames;
  });

  $scope.flag = $route.current.params.countryCode.toLowerCase();
  $scope.map = $route.current.params.countryCode;
}]);
