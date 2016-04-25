'use strict';

angular.module('calendar', [
  'ngRoute',
  'ui.bootstrap',
  'ui.calendar',
  'calendar.weatherService',
  'calendar.monthView'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/month_view'});
}]);
