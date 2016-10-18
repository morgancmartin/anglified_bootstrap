app.directive('editMce', function () {
  return {
    restrict: 'E',
    scope: {
      edit: '<',
      onToggle: '&'
    },
    templateUrl: 'templates/edit_tinymce/edit_tinymce.html',
    link: function (scope) {
      scope.toggleMCEState = function () {
        var stateObj = {
          type: 'tinymce',
          bool: !scope.edit
        };
        scope.onToggle({stateObj: stateObj});
      };
    }
  };
});
