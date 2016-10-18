app.controller('PageWatchCtrl',
['$scope', '$rootScope', "_", 'submitService',
function($scope, $rootScope, _, submitService){
  var elements = angular.element('body *');

  for (var i =1; i < ( 1 + elements.length ); i++){
    angular.element(elements[i]).attr('data-id', i);
  }
  // compare element's id with currentstate; if match { show }

  $scope.page = {};

  $scope.states = ['home'];
  $scope.count = 0;
  $scope.nextState = function (slideTo) {
    if(slideTo){
      $scope.count = slideTo;
    } else {
      $scope.count = ($scope.count + 1) % $scope.states.length;
    }
    $scope.$broadcast('states.nextState', $scope.states, $scope.count);
  };

  // Clicking 'make a new slide' on a section/header/footer
  // should take it out of the main page and give it its own slide.
  $scope.createSlide = function($event){
    var slideTag = angular.element($event.currentTarget).closest('section');
    if (!slideTag.length){
      slideTag = angular.element($event.currentTarget).closest('header');
    }

    slideTag.attr('data-slide', $scope.states.length);
    // Tell checkbox to call its getDataSlide function.
    $scope.$broadcast('states.getDataSlide');
    $scope.states.push(slideTag.attr('data-slide'));
    $scope.nextState($scope.states.length);
  };

  $scope.nextState = function(jump) {
    if (jump){
      $scope.count = jump - 1;
    } else {
      $scope.count = ($scope.count + 1) % $scope.states.length;
    }
    $scope.$broadcast('states.nextState', $scope.states[$scope.count] );
  };

  // Edit states of the different parts.
  $scope.editStates = {
    section: false,
    textbox: false
  };

  // Listener for toggle events in the sidebar.
  $rootScope.$on('sidebar.toggled', function (ev, editStates) {
    angular.copy(editStates, $scope.editStates);
  });

  $scope.submitPage = function(){
    submitService.submitPage($scope.states).then(function(response){
      console.log(response);
      return response;
    }).catch(function(reason){
      console.log(reason);
    });
  };
}]);
