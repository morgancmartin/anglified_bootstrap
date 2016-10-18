describe('editSections', function () {
  beforeEach(module('editApp'));

  var $compile, $rootScope, scope, directive;

  beforeEach(inject(function($rootScope, $compile) {
    $compile = $compile;
    $rootScope = $rootScope;
    scope = $rootScope.$new();

    scope.edit = jasmine.createSpy('edit');
    scope.toggleSectionState = jasmine.createSpy('toggleSectionState');
  }));

  function getCompiledElement () {
    var element = angular.element("<i class='fa fa-crosshairs click' ng-click='toggleSectionState()'></i>");
    var compiled = $compile(element)(scope);
    scope.digest();
    return compiled;
  }

  describe('toggleSectionState', function () {
    it('toggles the edit state of the section', function () {
      // need to fix this.
      expect(scope.edit).toBe(false);
      scope.toggleSectionState();
      expect(scope.edit).toBe(true);
    });
  });
});
