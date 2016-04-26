'use strict';

angular.module('calendar.monthView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/month_view', {
    templateUrl: 'month_view/month_view.html',
    controller: 'MonthViewController'
  });
}])

.controller('MonthViewController', ["$scope", "$uibModal", function($scope, $uibModal) {

  $scope.calendarView = 'month';
  $scope.calendarDate = new Date;

  $scope.events = [
    {
      title: 'My event title', // The title of the event
      type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
      startsAt: new Date(), // A javascript date object for when the event starts
      endsAt: new Date(), // Optional - a javascript date object for when the event ends
      editable: true, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
      deletable: true, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
      draggable: true, //Allow an event to be dragged and dropped
      resizable: true, //Allow an event to be resizable
      incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
      recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
      cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
    }
  ];

  // $scope.calendarTitle;

  $scope.onEventClicked = function(event) {
    console.log(event)
    console.log('clicked event');
  };

  $scope.onEventEdited = function(event) {
    console.log('event edited')
    console.log(event)
  }

  $scope.onEventDeleted = function(event) {
    console.log('event deleted')
    console.log(event)
  }

  $scope.newEventBtnClick = function() {
    console.log('new event');
    $scope.open();

  }

  $scope.event = {};

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal/modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        event: function () {
          return $scope.event;
        }
      }
    });

    modalInstance.result.then(function (event) {
      console.log('modal instance result');
      $scope.event=  event;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}])
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, event) {

    $scope.event = event;

    $scope.ok = function () {
      $uibModalInstance.close($scope.event);
      console.log($scope.event)
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });