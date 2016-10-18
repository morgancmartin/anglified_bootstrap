app.controller('CommentsPreviewCtrl', ['ResourceService', function(ResourceService) {

  var vm = this;

  vm.addResource = function () {
    ResourceService.addResource('comments');
  };

  vm.random = function () {
    var rand = parseInt(Math.random(500)*1000);
    return rand % 2 === 0 ? 'love' : 'hate';
  };

  vm.comments = [1,2,3];
}]);
