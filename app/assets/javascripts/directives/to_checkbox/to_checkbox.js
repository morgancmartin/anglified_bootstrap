app.directive('toCheckbox', [ function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/to_checkbox/to_checkbox.html',
    scope: {
      nodeForm: '='
    },
    link: function (scope, element) {
      scope.getDataId = function () {
        var slideTag = element.closest('section');
        if (!slideTag.length) {
          slideTag = element.closest('header');
        }
        return slideTag.attr('data-id');
      };
    }
  };
}]);
