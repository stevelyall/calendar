/**
 * Controller for calendar view.
 * Supplies angular-bootstrap-calendar (https://github.com/mattlewis92/angular-bootstrap-calendar)
 * with events, shows day with weather when date clicked.
 */

angular.module('calendar.calendarController', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/calendar_view', {
      templateUrl: 'templates/calendar.html',
      controller: 'CalendarController'
    });
  }])

  .controller('CalendarController', ["$scope", "$uibModal", "WeatherService", function ($scope, $uibModal, WeatherService) {
    $scope.calendarView = 'month';
    $scope.calendarDate = new Date;

    $scope.datePickerFormat = 'dd-MMMM-yyyy';

    $scope.noForecastMsg = 'No forecast available for this day';
    $scope.dateRangeInvalidMsg = '';

    $scope.$watch('calendarDate', function () {
      $scope.dateWeather = WeatherService.getWeatherForDate($scope.calendarDate);
    });

    $scope.events = [];

    // test events
    $scope.events.push(new Event('Exam Period', 'Appointment', moment("20160408T0900").toDate(), moment("20160423T2359").toDate()));
    $scope.events.push(new Event('Return Calendar', 'Appointment', moment("20160427T1000").toDate()));
    $scope.events.push(new Event('Complete Calendar', 'Task', moment("20160425T1000").toDate(), moment("20160427T1000").toDate()));
    $scope.events.push(new Event('Packing', 'Meeting', moment("20160423T1700").toDate(), moment("20160428T0900").toDate()));
    $scope.events.push(new Event('Meeting with Greg', 'Meeting', moment("20160425T0930").toDate(), moment().add(2, 'hours').toDate()));
    $scope.events.push(new Event('Sign Storage Agreement', 'Task', moment("20160428T1200").toDate()));

    
    $scope.onEventEditClick = function (event) {
      $scope.event = event;
      $scope.modalAction = 'Edit';
      $scope.openModal();
    };

    $scope.onEventDeleteClick = function (event) {
      $scope.event = event;
      $scope.modalAction = 'Delete';
      $scope.openModal();
    };

    $scope.newEventBtnClick = function () {
      $scope.event = new Event();
      $scope.modalAction = 'Add';
      $scope.openModal();
    };


   $scope.checkDateRangeValid = function(start, end) {
      if (end < start) {
        $scope.dateRangeInvalidMsg = "Event end time must be after start time";
        return false;
      }
     $scope.dateRangeInvalidMsg = '';
      return true;
    };

    /**
     * Opens event modification modal.
     */
    $scope.openModal = function () {

      var modalConfig = {
        animation: true,
        controller: 'ModalInstanceController',
        templateUrl: 'templates/editEventModal.html',
        resolve: {
          modalAction: function () {
            return $scope.modalAction;
          },
          event: function () {
            return $scope.event;
          }
        }
      };

      if ($scope.modalAction == 'Delete') {
        modalConfig.templateUrl = 'templates/deleteEventModal.html';
      }
      var modalInstance = $uibModal.open(modalConfig);

      // after modal is closed
      modalInstance.result.then(function (result) {
        var resultEvent = result.event;
        var eventIndex = result.eventIndex;

        if (result.action == 'Add') {
          $scope.events.push(resultEvent);
        }
        if (result.action == 'Edit') {
          $scope.events[eventIndex] = resultEvent;
        }
        if (result.action == 'Delete') {
          $scope.events.splice(resultEvent)
        }
      });

    };

  }]);