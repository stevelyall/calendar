'use strict';

angular.module('calendar.monthView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/month_view', {
    templateUrl: 'month_view/month_view.html',
    controller: 'MonthViewController'
  });
}])

.controller('MonthViewController', ["$scope", "WeatherService", function($scope, WeatherService) {
  var now = new Date();

  // $scope.events = [
  //   {title: 'Test Event (All Day)', start: new Date(now.getYear(), now.getMonth(), 1)}
  // ];

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.events = [
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false}
  ];

  $scope.eventSources = [ $scope.events ];

  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
    callback(events);
  };

  $scope.addEvent = function() {
    $scope.events.push({
      title: 'Open Sesame',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      className: ['openSesame']
    });
  };

  $scope.calendarConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: onDayClicked,
      eventClick: onEventClicked
    }
  };

  function onDayClicked(e) {
    console.log(e)
    console.log('clicked day')
  }

  function onEventClicked(e) {
    console.log(e)
    console.log('clicked event');
  }


}]);