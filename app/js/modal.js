/**
 * Controller for event modal.
 */

angular.module('calendar.modal', [])
.controller('ModalInstanceController', function ($scope, $uibModalInstance, event, modalAction) {

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

  $scope.ok = function () {
    var modalResult = {
      action : $scope.modalAction,
      event : $scope.event,
      eventIndex : eventIndex
    };
    $uibModalInstance.close(modalResult);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


});