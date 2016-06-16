angular.module('dataCompile', [])

.factory('countryData', ['dataFactory', function(dataFactory) {
    var countryData = {};

    countryData.countries = dataFactory.getCountries();
    countryData.getCountry = dataFactory.getCountry;
    countryData.getNeighbors = dataFactory.getNeighbors;
    countryData.getCapitals = dataFactory.getCapitals;
    return countryData;
}]);
