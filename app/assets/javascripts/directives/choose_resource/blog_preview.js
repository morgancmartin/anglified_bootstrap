// Will add RESTful functionality in the future.
app.controller('BlogModalCtrl',
['$uibModalInstance', 'data',
function ($uibModalInstance, data) {
  var vm = this;

  vm.data = data;

  vm.ok = function () {
   $uibModalInstance.close();
  };

  vm.cancel = function () {
   $uibModalInstance.dismiss('cancel');
  };
}]);

app.controller('BlogPreviewCtrl',
['ResourceService', '$uibModal', '$element', 'ResourceGenerator', '$injector',
function (ResourceService, $uibModal, $element, ResourceGenerator, $injector) {
  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('blog');
  };

  vm.$onInit = function () {
    var generatedResource = ResourceGenerator.generate('blogs', 'data', '.json');
    vm.blogs = $injector.instantiate(generatedResource);
    return vm.blogs.all();
  };

  // Toggle for ng-class.
  vm.active = false;
  vm.toggleActive = function () {
    vm.active = !vm.active;
    return vm.active;
  };

  // Modal functionality.
  vm.open = function (size) {
    vm.toggleActive();
    var parentElem = angular.element($element);
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'templates/choose_resource/blog_preview_modal.html',
      controller: 'BlogModalCtrl',
      controllerAs: 'modal',
      size: size,
      appendTo: parentElem,
      resolve: {
        data: vm.blogs.all
      }
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
    template: "<i class='fa fa-book click' ng-class=\"{\'active\': blog.active}\" ng-click='blog.open()'></i>"
  };
});
