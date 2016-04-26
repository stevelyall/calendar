'use strict';

angular.module('calendar', [
  'ngRoute',
  'calendar',
  'ui.bootstrap',
  'mwl.calendar',
  'calendar.weatherService',
  'calendar.calendarView'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/calendar_view'});
}]);
