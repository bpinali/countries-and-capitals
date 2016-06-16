angular.module('capitalApp')

.controller('mainCtrl',['$scope','countryData', function($scope, countryData) {}])

.controller('countriesCtrl', ['$scope','$location','$filter','countryData', '$q', function($scope, $location, $filter, countryData, $q) {
  'use strict';

  var toString = Object.prototype.toString;

  //checking to see if API call returned any data
  $q.when(countryData.countries).then(function(result){
    //checking to see if promise returns an object result
    if(toString.call(countryData.countries)=='[object Object]') {
      countryData.countries = result.geonames;
    }
    $scope.countries = countryData.countries;
  });

  $scope.showDetail = function(country) {
    $location.path('/countries/'+country.countryCode);
  };


  $scope.predicate = 'countryName';
  $scope.reverse=false;

  angular.forEach($scope.countries, function (country) {
    country.areaInSqKm = parseFloat(country.areaInSqKm);
    country.population = parseFloat(country.population);
  });


  $scope.startsWith = function (actual, expected) {
    var lowerStr = (actual + "").toLowerCase();
    return lowerStr.indexOf(expected.toLowerCase()) === 0;
  };


}]);
