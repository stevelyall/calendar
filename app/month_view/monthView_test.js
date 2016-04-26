'use strict';

describe('calendar.monthView module', function() {

  beforeEach(module('calendar.monthView'));

  describe('monthView controller', function(){

    it('controller should be defined', inject(function($rootScope, $controller) {
      var scope = $rootScope.$new();
      var monthController = $controller('MonthViewController', {$scope : scope});

      expect(monthController).toBeDefined();
    }));

  });
});