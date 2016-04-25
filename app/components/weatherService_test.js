describe('calendar.weatherService', function() {
  beforeEach(module('calendar.weatherService'));

  describe('weather service is defined', function () {
    beforeEach(module(function(WeatherService) {
      console.log(WeatherService)
    }))

  })
});