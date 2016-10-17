app.directive('editSections', function () {
  return {
    restrict: 'E',
    scope: {
      edit: '<',
      onToggle: '&'
    },
    templateUrl: 'edit_sections/edit_sections.html',
    link: function (scope) {
      // For toggling between checkboxes and edit buttons.
      scope.toggleSectionState = function () {
        // Container for the 'kind' of editable, and the corresponding boolean.
        var stateObj = {
          type: 'section',
          bool: !scope.edit
        };
        // & callback must take an obj. The key represents the argument that the parent will see.
        // The value is what you actually want to pass up to the parent.
        scope.onToggle({stateObj: stateObj});
      };
      scope.getPopoverContent = function () {
        return 'hello';
      };
    }
  };
});
