'use strict';

describe('calendar.monthView module', function() {

  beforeEach(module('calendar.monthView'));

  describe('monthView controller', function(){

    it('controller should be defined', inject(function($rootScope, WeatherService, $controller) {
      var scope = $rootScope.$new();
      module('calendar.weatherService');
      console.log(WeatherService)
      var monthController = $controller('MonthViewController', {$scope : scope, WeatherService : weatherService});

      expect(monthController).toBeDefined();
    }));

  });
});