app.controller('CommentsPreviewCtrl', ['ResourceService', function(ResourceService) {

  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('comments');
  };

  vm.comments = [1,2,3];
}]);
