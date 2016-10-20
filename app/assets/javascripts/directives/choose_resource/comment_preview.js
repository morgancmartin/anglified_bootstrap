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

  // Toggle for ng-class.
  vm.active = false;
  vm.toggleActive = function () {
    vm.active = !vm.active;
    return vm.active;
  };

  vm.open = function (size) {
    vm.toggleActive();
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

    modalInstance.result.then(vm.addResource);
  };
}]);

app.directive('commentPreview', [function () {
  return {
    controller: 'CommentPreviewCtrl',
    controllerAs: 'comment',
    bindToController: true,
    restrict: 'E',
    template: "<i class='fa fa-comments-o click' ng-class=\"{\'active\': comment.active}\" ng-click='comment.open()'></i>"
  };
}]);
