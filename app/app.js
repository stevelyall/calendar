angular.module('calendar', [
  'ngRoute',
  'ui.bootstrap',
  'mwl.calendar',
  'calendar.weatherService',
  'calendar.modal',
  'calendar.calendarController'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/calendar_view'});
}]);
