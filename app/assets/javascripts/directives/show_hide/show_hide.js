app.directive('showHide', ['$', function ($) {

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
        var slides = $("[data-slide='" + slide + "']");
        if (slides.length < 2) {
          slides.find('button.create-slide').first().hide();
        } else {
          slides.find('button.create-slide').first().show();
        }
      };

      scope.compareWithCurrentState = function (slide) {
        if(slide !== el.attr('data-slide')){
          el.removeClass('ng-hide-remove').show();
          el.addClass('ng-hide-add').hide();
        } else {
          el.removeClass('ng-hide-add').hide();
          el.addClass('ng-hide-remove').show();
        }

        scope.checkLessThanTwo(slide);
      };

      scope.$on('states.nextState', function(ev, slide) {
        scope.compareWithCurrentState(slide);
      });
    }
  };

}]);
