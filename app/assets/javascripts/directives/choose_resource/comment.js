app.controller('CommentCtrl', [function () {
  var vm = this;
  vm.hideMe = true;
  vm.toggle = function () {
    vm.hideMe = !vm.hideMe;
  };
}]);

app.directive('comment', [function () {
  return {
    restrict: 'E',
    controller: 'CommentCtrl',
    controllerAs: 'vm',
    scope: {},
    templateUrl: '/templates/choose_resource/comment.html'
  };
}]);
