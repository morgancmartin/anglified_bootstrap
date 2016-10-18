describe('PageWatchCtrl', function() {
  beforeEach(module('editApp'));

  var $controller, $rootScope, $event, $scope, ctrl;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $event = {};

    // Setting up $scope and controller.
    $scope = {};
    ctrl = $controller('PageWatchCtrl', {$scope: $scope});
    // mock the $broadcast method
    $scope.$broadcast = function () {};
    spyOn($scope,'$broadcast');
  }));

  describe('createSlide', function () {
    it('adds a state', function () {
      var element = "<section data-slide='1'></section>";
      $event.currentTarget = element;
      $scope.createSlide($event);
      expect($scope.states.length).toEqual(2);
    });
  });
});
