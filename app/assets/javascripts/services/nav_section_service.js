app.factory('navSectionService', 
  ["_", "$timeout", function(_, $timeout) {

  var stub = {};

  var _nav = angular.element('.nav.navbar-nav.navbar-right');
  /** instead of clearing nav clone the current nav buttons
  **/

  stub.setUpNav = function(nextState) {
    angular.element(document).ready( function(){
      stub.clearNav();
      stub.addScrollButton(nextState);
      stub.addNavLink('home', 1, nextState);

      //removing overlay temporrarilty
      angular.element('#DIV_44').remove();
    })
  }

  stub.clearNav = function() {
    _nav.html('');
  };

  stub.addScrollButton = function(nextState) {
    var next = angular.element('<button>')
      .addClass('page-scroll btn btn-sm btn-success')
      .text('Next');
    _nav.append(next);
    next.click(function() { 
      nextState(); 
    });
    // $scope.addNavLink('home');
  };

  // slideName, index, nextState function
  stub.addNavLink = function(slideName, statesLength, nextState) {
    var index = statesLength - 1;
    var section = angular.element('<button>')
      .attr('id', "nav='" + index + "'" )
      .addClass('page-scroll textable btn btn-sm btn-primary')
      .text(slideName);
    _nav.append(section);
    section.click( function () {
      nextState(slideName);
    });
  }

  return stub;
}]);
