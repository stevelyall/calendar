'use strict';

angular.module('calendar.calendarView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar_view', {
    templateUrl: 'calendar_view/calendar_view.html',
    controller: 'CalendarController'
  });
}])

.controller('CalendarController', ["$scope", "$uibModal", "WeatherService", function($scope, $uibModal, WeatherService) {
  $scope.calendarView = 'month';
  $scope.calendarDate = new Date;
  $scope.animationsEnabled = true;

  $scope.datePickerFormat = 'dd-MMMM-yyyy';

  $scope.noForecastMsg = 'No forecast available for this day';

  $scope.$watch('calendarDate', function() {
    $scope.dateWeather = WeatherService.getWeatherForDate($scope.calendarDate);
  });

  $scope.events = [];
  $scope.events.push(new Event('Test Event', 'info', new Date()));
 // $scope.events.push(new Event('Test Event', 'success', new Date(), new Date()));


  function Event(title, type, start, end) {
    // TODO task types separate
    return {
      title : title,
      type : type || 'info',
      startsAt : start || new Date(),
      endsAt : end,
      editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
      incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      // cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    }
  }
  
  $scope.onEventClicked = function(event) {
    console.log(event)
    console.log('clicked event');
  };

  $scope.onEventEditClick = function(event) {
    console.log('event edited')
    $scope.event = event;
    $scope.modalAction = 'Edit';
    $scope.openModal();
    console.log(event)
  };

  $scope.onEventDeleteClick = function(event) {
    console.log('event deleted')
    console.log(event)
    $scope.event = event;
    $scope.modalAction = 'Delete';
    $scope.openModal();

  };

  $scope.newEventBtnClick = function() {
    console.log('new event');
    $scope.event = new Event();
    $scope.modalAction = 'Add';
    $scope.openModal();

  };

  $scope.onViewChangeClick = function(cell) {
    console.log('viewchange')
    console.log(cell)
  };



  $scope.openModal = function (size) {

    var modalConfig = {
      animation: $scope.animationsEnabled,
     // templateUrl: 'modal/modal.html',
      controller: 'ModalInstanceController',
      size: size,
      resolve: {
        modalAction : function() {
          return $scope.modalAction;
        },
        event: function () {
          return $scope.event;
        }
      }
    };

    modalConfig.templateUrl = ($scope.modalAction == "Delete") ? 'modal/deleteModal.html' : 'modal/addEditModal.html';

    var modalInstance = $uibModal.open(modalConfig);

    modalInstance.result.then(function (result) {
      console.log('modal instance result');
      var resultEvent = result.event;
      var eventIndex = result.eventIndex;

      if (result.action == 'Add') {
        $scope.events.push(resultEvent);
      }
      if (result.action == 'Edit') {
        $scope.events[eventIndex] = resultEvent;
      }
      if (result.action == 'Delete') {
        console.log(resultEvent)
        $scope.events.splice(resultEvent)
      }

    }, function () {
      console.log('modal closed');
    });
  };

}]);