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

    $scope.$watch('calendarDate', function () {
      $scope.dateWeather = WeatherService.getWeatherForDate($scope.calendarDate);
    });

    $scope.events = [];
    $scope.events.push(new Event('Test Event', 'Meeting', new Date()));
    // $scope.events.push(new Event('Test Event', 'success', new Date(), moment().add(2, 'hours').toDate()));

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