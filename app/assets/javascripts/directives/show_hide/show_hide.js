app.directive('showHide', ["$timeout", function($timeout) {

  return {
    restrict: 'A',
    scope: {
      currentState: '=',
      editStates: '='
    },
    link: function (scope, el, attr, controller) {
      scope.checkLessThanTwo = function (slide) {
        // Check if there are less than two slides left.
        // Then hide/show button.
        var slides = angular.element("[data-slide='" + slide + "']");
        if (slides.length < 2) {
          slides.find('.create-slide').hide();
        } else {
          slides.find('.create-slide').show();
        }
      };

      // Difficult to test. Lots of side effects. Refactor if there's time.
      scope.compareWithCurrentState = function (slide) {
        if(slide !== el.attr('data-slide')){
          // el.removeClass('ng-hide-remove').show();
          el.addClass('ng-hide-add').hide();
        } else {
          el.removeClass('ng-hide-add').hide();
          el.addClass('ng-hide-remove').show();
          $timeout(function(){
            el.removeClass('ng-hide-remove');
          }, 350);
        }

        scope.checkLessThanTwo(slide);
      };

      scope.$on('states.nextState', function(ev, slide) {
        scope.compareWithCurrentState(slide);
      });
    }
  };

}]);
