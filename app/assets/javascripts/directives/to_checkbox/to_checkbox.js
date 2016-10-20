app.directive('toCheckbox', [ function() {
  return {
    restrict: 'E',
    templateUrl: '/templates/to_checkbox/to_checkbox.html',
    scope: {},
    link: function (scope, element) {
      scope.getDataSlide = function () {
        var slideTag = element.closest('section');
        if (!slideTag.length) {
          slideTag = element.closest('header');
        }
        scope.checkboxValue = slideTag.attr('data-slide');
      };

      // Wait for PageWatchCtrl's signal before setting the value.
      scope.$on('states.getDataSlide', function (ev) {
        scope.getDataSlide();
      });

      // Tell PageWatchCtrl to toggle the scope's value.
      scope.broadcastValue = function () {
        scope.$emit('checkbox.value', scope.checkboxValue);
      };
    }
  };
}]);
