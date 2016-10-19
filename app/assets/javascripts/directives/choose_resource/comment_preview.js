// Will add RESTful functionality in the future.
app.controller('CommentModalCtrl',
['$uibModalInstance', 'data', function ($uibModalInstance, data) {
  var vm = this;

  vm.data = data;

  vm.ok = function () {
   $uibModalInstance.close();
  };

  vm.cancel = function () {
   $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('CommentPreviewCtrl',
['ResourceService', '$element', '$uibModal', 'ResourceGenerator', '$injector',
function (ResourceService, $element, $uibModal, ResourceGenerator, $injector) {
  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('comment');
  };

  vm.$onInit = function () {
    var generatedResource = ResourceGenerator.generate('comments', 'data', '.json');
    vm.comments = $injector.instantiate(generatedResource);
    return vm.comments.all();
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
        data: vm.comments.all
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
