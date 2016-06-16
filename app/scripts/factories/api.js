angular.module('apiDataService', [])

.factory('dataFactory', ['$http', '$route', '$q', function($http, $route, $q) {
    var username = "bpin";
    var baseUrl = "http://api.geonames.org/";

    return {
        getCountries: function() {
            var deferred = $q.defer();
            var url = baseUrl + "countryInfoJSON";
            var request = {
                callback: 'JSON_CALLBACK',
                username: username
            };
            $http({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })
                .success(function(data, status, headers, config) {
                    if (typeof data.status == 'object') {
                        console.log("Error'" + data.status.message + "'");
                        deferred.reject(data.status);
                    } else {
                        deferred.resolve(data);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(status + " error when attempting to access geonames.org.");
                    deferred.reject();
                });
            return deferred.promise;
        },

        getCountry: function(countryCode) {
            var deferred = $q.defer();
            var url = baseUrl + "countryInfoJSON";
            var request = {
                callback: 'JSON_CALLBACK',
                country: countryCode,
                username: username
            };
            $http({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data.geonames);
                })
                .error(function(data, status, headers, config) {
                    console.log(status + " error when attempting to get country information from geonames.org.");
                    deferred.reject();
                });
            return deferred.promise;
        },

        getNeighbors: function(countryCode) {
            var deferred = $q.defer();
            var url = baseUrl + "neighboursJSON";
            var request = {
                callback: 'JSON_CALLBACK',
                country: countryCode,
                username: username
            };
            $http({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    console.log(status + " error when attempting to access geonames.org.");
                    deferred.reject();
                });
            return deferred.promise;
        },
        getCapitals: function(countryCode) {
            var deferred = $q.defer();
            var url = baseUrl + "searchJSON";
            var request = {
                callback: 'JSON_CALLBACK',
                q: "capital",
                formatted: true,
                maxRows: 1,
                country: countryCode,
                username: username
            };
            $http({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })
                .success(function(data, status, headers, config) {
                    deferred.resolve(data.geonames[0]);
                })
                .error(function(data, status, headers, config) {
                    console.log(status + " error when attempting to access geonames.org.");
                    deferred.reject();
                });
            return deferred.promise;
        }
    };
}]);
