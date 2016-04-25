'use strict';

angular.module('calendar.weatherService', [])
.factory('WeatherService', function ($http) {

  var weather;

  $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D9807%20&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    .then(function(response) {
     console.log(response)
    }
      ,function(response) {
      console.error(response)
    });

  return {
    hello : function() {
      return "hello from weather service";
    }


  }

});