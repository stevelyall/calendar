'use strict';

angular.module('calendar.calendarView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar_view', {
    templateUrl: 'calendar_view/calendar_view.html',
    controller: 'CalendarController'
  });
}])

.controller('CalendarController', ["$scope", "$uibModal", function($scope, $uibModal) {

  $scope.calendarView = 'month';
  $scope.calendarDate = new Date;

  $scope.events = [];
  $scope.events.push(new Event('Test Event', 'info', new Date()));
//  $scope.events.push(new Event('Test Event', 'warning', new Date()));
 // $scope.events.push(new Event('Test Event', 'success', new Date(), new Date()));

  // TODO start and end times can't match exactly
  // $scope.calendarTitle;

  function Event(title, type, start, end) {
    // TODO task types separate
    return {
      title : title,
      type : type || 'info',
      startsAt : start || new Date(),
      endsAt : end,
      editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
      draggable: true, //Allow an event to be dragged and dropped
      resizable: true, //Allow an event to be resizable
      incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
      cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
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
  }

  $scope.onEventDeleteClick = function(event) {
    console.log('event deleted')
    console.log(event)
    $scope.event = event;
    $scope.modalAction = 'Delete';
    $scope.openModal();

  }

  $scope.newEventBtnClick = function() {
    console.log('new event');
    $scope.event = new Event();
    $scope.modalAction = 'Add';
    $scope.openModal();

  }

  $scope.animationsEnabled = true;

  $scope.openModal = function (size) {

    var modalConfig = {
      animation: $scope.animationsEnabled,
     // templateUrl: 'modal/modal.html',
      controller: 'ModalInstanceCtrl',
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

    modalConfig.templateUrl = ($scope.modalAction == "Delete") ? 'modal/deleteModal.html' : 'modal/modal.html';

    var modalInstance = $uibModal.open(modalConfig);

    modalInstance.result.then(function (result) {
      console.log('modal instance result');
      var resultEvent = result.event;
      var eventIndex = result.eventIndex;

      console.log($scope.events);

      console.log(resultEvent)

      if (result.action == 'Add') {
        console.log('modalAdded');
        $scope.events.push(resultEvent);
      }
      if (result.action == 'Edit') {
        console.log('modal edited');
        $scope.events[eventIndex] = resultEvent;
      }
      if (result.action == 'Delete') {
        console.log('modal deleted');
        console.log(resultEvent)
        $scope.events.splice(resultEvent)
      }

     // $scope.event =  event;

    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}])
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, event, modalAction) {

    $scope.modalAction = modalAction;
    var eventIndex = event.$id;
    $scope.event = angular.copy(event);


    $scope.openStartDatePopup = function() {
      $scope.startDatePopup.opened = true;

    };

    $scope.openEndDatePopup = function() {
      $scope.endDatePopup.opened = true;
    };

    $scope.startDatePopup = {
      opened : false
    };

    $scope.endDatePopup = {
      opened : false
    };

    $scope.datePickerFormat = 'dd-MMMM-yyyy';

    // console.log($scope.event);

    $scope.ok = function () {
    console.log($scope.event.$id)
    console.log(event.$id)
      var modalResult = {
        action : $scope.modalAction,
        event : $scope.event,
        eventIndex : eventIndex
      };
      // console.log(modalResult)
      $uibModalInstance.close(modalResult);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    
  });