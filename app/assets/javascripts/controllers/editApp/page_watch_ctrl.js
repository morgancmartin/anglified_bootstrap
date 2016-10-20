app.controller('PageWatchCtrl',
['$scope', '$rootScope', "_", 'submitService', 'tinyMCEService', 'userEditService', 'navSectionService',
function($scope, $rootScope, _, submitService, tinyMCEService, userEditService, navSectionService){

  $scope.editStates = {
    section: false,
    textbox: false,
    tinymce: false
  };

  $scope.onKeyUp = function($event){
    if (window.event.keyCode == 83 && window.event.ctrlKey == true ){
      userEditService.undoSlideChange()
      .then(function(slideStateObj){
        var axedSlideIdx = $scope.states.indexOf(slideStateObj.prevSlideName);
        $scope.states.splice(axedSlideIdx, 1);
        $scope.nextState(slideStateObj.toSlideName);
        return slideStateObj;
      });
    }
  };

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

    console.log('this is the slideTag: ' , slideTag);

    if (!slideTag.length){
      slideTag = angular.element($event.currentTarget).closest('header');
    }
    userEditService.addSlideChange(slideTag);
    slideTag.attr('data-slide', $scope.states.length);
    // Tell checkbox to call its getDataSlide function.
    $scope.$broadcast('states.getDataSlide');
    $scope.states.push(slideTag.attr('data-slide'));

    $scope.addNavLink(slideTag.attr('data-slide'));
    $scope.nextState(slideTag.attr('data-slide'));
  };

  /**
    ADRIAN_REFACTOR
    **/
  $scope.addNavLink = function(slideName) {
    var index = $scope.states.length - 1;
    var section = angular.element('<button>')
      .attr('id', "nav='" + index + "'" )
      .addClass('page-scroll textable btn btn-sm btn-primary')
      .text(slideName);
    angular.element('.nav.navbar-nav.navbar-right').append(
      section);
    section.click( function () {
      console.log('the new index: ', index);
      $scope.nextState(slideName);
    });
  }



  $scope.nextState = function(slideName) {
    console.log(slideName);
    if (slideName){
      $scope.count = $scope.states.indexOf(slideName.toString());
    } else {
      $scope.count = ($scope.count + 1) % $scope.states.length;
    }
    $scope.$broadcast('states.nextState', $scope.states[$scope.count]);
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


  navSectionService.setUpNav($scope.nextState);
  // var p1 = new Promise( function(resolve, reject) {
  //    window.setTimeout( function() {
  //     resolve(navSectionService.clearNav());
  //     }, 0);
  //   });

  // var p2 = new Promise( function(resolve, reject) {
  //     window.setTimeout( function() {
  //       resolve(navSectionService.addScrollButton()
  //         .click($scope.nextState() ));
  //     }, 0);
  //   });

  // p1.then(function() { console.log('hi0'); p2.then(console.log('hi'))});

  // .click( function() { $scope.nextState() });

  /*
  ----------------------------------------------------
  Tiny MCE
  ----------------------------------------------------
  */

  $scope.mce = function(event) {
    tinyMCEService.callMCE(event);
  };

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
