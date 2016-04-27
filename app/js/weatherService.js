/**
 * Retrieves weather from Yahoo API, provides CalendarController with
 * forecast for given day.
 */
angular.module('calendar.weatherService', [])
.factory('WeatherService', function ($http) {

  var weatherEndpoint = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D9807%20&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  var forecast = {};

  $http.get(weatherEndpoint)
    .then(function(response) {
      var weather = response.data.query.results.channel;
      var tempUnit = weather.units.temperature;
      weather.item.forecast.forEach(function(dayForecast) {
        dayForecast.high += " " + tempUnit;
        dayForecast.low += " " + tempUnit;
        forecast[dayForecast.date] = dayForecast;
      });
    },
      function(response) {
      console.error(response)
    });

  return {
    getWeatherForDate: function(date) {
      date = moment(date).format('DD MMM YYYY');
      return forecast[date];
    }
  }

});