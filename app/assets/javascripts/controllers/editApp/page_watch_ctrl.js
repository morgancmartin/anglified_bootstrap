app.controller('PageWatchCtrl',
['$scope', '$rootScope', "_", 'submitService', 'tinyMCEService',
function($scope, $rootScope, _, submitService, tinyMCEService){

  $scope.editStates = {
    section: false,
    textbox: false,
    tinymce: false
  };

  var elements = angular.element('body *');

  // for (var i =1; i < ( 1 + elements.length ); i++){
  //   angular.element(elements[i]).attr('data-id', i);
  // }
  // compare element's id with currentstate; if match { show }

  $scope.page = {};
  $scope.states = ['home'];
  $scope.count = 0;


  // Listener for toggle events in the sidebar.
  $rootScope.$on('sidebar.toggled', function (ev, editStates) {
    angular.copy(editStates, $scope.editStates);
  });

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

  // Checkbox values for sections.
  // Toggle true/false
  $scope.checkboxValues = {};
  $rootScope.$on('checkbox.value', function (ev, checkboxValue) {
    if ($scope.checkboxValues[checkboxValue]) {
      $scope.checkboxValues[checkboxValue] = !$scope.checkboxValues[checkboxValue];
    } else {
      $scope.checkboxValues[checkboxValue] = true;
    }
  });

  // Storing data to be sent to the Rails API.
  $scope.submitPage = function(){
    submitService.submitPage($scope.states).then(function(response){
      console.log(response);
      return response;
    }).catch(function(reason){
      console.log(reason);
    });
  };


  debugger;

  /*
  ----------------------------------------------------
  Tiny MCE
  ----------------------------------------------------
  */

  $scope.previousId;
  $scope.mce = function (event) {
    tinyMCEService.clearEditors();
    var id;
    // handle edge cases to select textable
    if($scope.previousId) {
      var nested_targ = event.target;
      while (!nested_targ.class && (nested_targ.class !== "textable" )) {
        if (nested_targ.id) {
          id = nested_targ.id;
          break;
        }
        nested_targ = angular.element(nested_targ).parent()[0];
      }
    } else {
      id = event.target.id;
      $scope.previousId = id;
    }
    tinyMCEService.initMCE(id);  
  }
  //sets a listener to 'textable' class tags
  // builds tinyMCE editor and hides selected tag
  $scope.$watch('editStates.tinymce', function(newVal) {    
    if (newVal) {
      angular.element('.textable').on('click', $scope.mce);
    } else {
      tinyMCEService.clearEditors();
      angular.element('.textable').off('click', $scope.mce);
      console.log("tinyMCE listeners OFF");
    }
  });


}]);
