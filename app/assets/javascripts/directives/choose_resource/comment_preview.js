// Will add RESTful functionality in the future.
app.controller('CommentModalCtrl',
['$uibModalInstance', 'data', function ($uibModalInstance, data) {
  var vm = this;

  vm.comments = data;

  vm.ok = function () {
   $uibModalInstance.close();
  };

  vm.cancel = function () {
   $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('CommentPreviewCtrl',
['ResourceService', '$element', '$uibModal',
function (ResourceService, $element, $uibModal) {
  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('comment');
  };

  vm.open = function (size) {
    var parentElem = angular.element($element);
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'templates/choose_resource/comment_preview_modal.html',
      controller: 'CommentModalCtrl',
      controllerAs: 'modal',
      size: size,
      appendTo: parentElem,
      resolve: {
        data: function () {
          return [1,2,3,4,5];
        }
      }
    });
  };
}]);

app.directive('commentPreview', function () {
  return {
    controller: 'CommentPreviewCtrl',
    controllerAs: 'comment',
    bindToController: true,
    restrict: 'E',
    template: "<i class='fa fa-comments-o click' ng-click='comment.open()'></i>"
  };
});
