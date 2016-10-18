describe('PageWatchCtrl', function() {
  beforeEach(module('editApp'));

  var $controller, $rootScope, $event, $scope, ctrl, element;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $event = {};

    // Setting up $scope and controller.
    // Jasmine complains about $scope.$watch
    // $scope = {};
    $scope = $rootScope.$new();
    ctrl = $controller('PageWatchCtrl', {$scope: $scope});

    // Mock the $broadcast method
    $scope.$broadcast = function () {};
    spyOn($scope,'$broadcast');

    // Selected section.
    element = "<section data-slide='1'></section>";
    $event.currentTarget = element;
  }));

  describe('createSlide', function () {
    beforeEach(function() {
      $scope.createSlide($event);
    });

    it('adds a state', function () {
      expect($scope.states.length).toEqual(2);
    });

    it('takes you to the recently created slide', function () {
      expect($scope.count).toEqual(1);
    });
  });

  describe('nextState', function () {
    beforeEach(function() {
      $scope.createSlide($event);
      $scope.nextState();
    });

    it("brings you to the start when you're at the last slide", function () {
      expect($scope.count).toEqual(0);
    });

    it("brings you to the next slide when you're not at the end", function () {
      $scope.nextState();
      expect($scope.count).toEqual(1);
    });
  });

  describe('sidebar.toggled', function () {
    it('toggles the show/hide states of different parts of the page', function() {
      var editStates = {
        section: true
      };
      $rootScope.$emit('sidebar.toggled', editStates);
      expect($scope.editStates.section).toBe(true);
    });
  });

  describe('checkboxValues', function () {
    it("sets true for a checkbox when that checkbox is selected", function () {
      var checkboxValue = 1;
      $rootScope.$emit('checkbox.value', checkboxValue);
      expect($scope.checkboxValues[checkboxValue]).toBe(true);
    });
  });
});
