app.directive('editTextboxes', function () {
  return {
    restrict: 'E',
    scope: {
      edit: '<',
      onToggle: '&'
    },
    templateUrl: 'edit_textboxes/edit_textboxes.html',
    link: function (scope) {
      scope.toggleTextboxState = function () {
        var stateObj = {
          type: 'textbox',
          bool: !scope.edit
        };
        scope.onToggle({stateObj: stateObj});
      };
    }
  };
});
