// 'Smart' component. Holds state.
app.controller('SideBarCtrl', ['$rootScope', function ($rootScope) {
  var vm = this;

  vm.editStates = {
    section: false,
    textbox: false,
    tinymce: false
  };

  vm.toggle = function (stateObj) {
    vm.editStates[stateObj.type] = stateObj.bool;
    // Pass editStates obj to master controller.
    $rootScope.$emit('sidebar.toggled', vm.editStates);
  };
}]);

app.directive('sideBar', function () {
  return {
    controller: 'SideBarCtrl',
    controllerAs: 'side',
    restrict: 'E',
    scope: {},
    templateUrl: 'templates/side_bar/side_bar.html'
  };
});
