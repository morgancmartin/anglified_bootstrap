app.controller('BlogPreviewCtrl', ['ResourceService', function (ResourceService) {
  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('blog');
  };
}]);
