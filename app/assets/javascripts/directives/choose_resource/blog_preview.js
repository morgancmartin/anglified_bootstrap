// Will add RESTful functionality in the future.
app.controller('BlogModalCtrl',
['$uibModalInstance', function ($uibModalInstance) {
  var vm = this;

  vm.ok = function () {
   $uibModalInstance.close();
  };

  vm.cancel = function () {
   $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('BlogPreviewCtrl',
['ResourceService', '$uibModal', '$element',
function (ResourceService, $uibModal, $element) {
  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('blog');
  };

  vm.open = function (size) {
    var parentElem = angular.element($element);
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'templates/choose_resource/blog_preview_modal.html',
      controller: 'BlogModalCtrl',
      controllerAs: 'modal',
      size: size,
      appendTo: parentElem
    });

    modalInstance.result.then(vm.addResource);
  };
}]);

app.directive('blogPreview', function() {
  return {
    controller: 'BlogPreviewCtrl',
    controllerAs: 'blog',
    bindToController: true,
    restrict: 'E',
    template: "<i class='fa fa-book click' ng-click='blog.open()'></i>"
  };
});
