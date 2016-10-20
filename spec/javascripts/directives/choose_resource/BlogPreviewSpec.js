describe('BlogPreviewCtrl', function () {
  var ctrl, $controller, $rootScope, $scope, $element, $compile;

  beforeEach(module('editApp'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$compile_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $element = angular.element("<div></div>");
    $compile($element);
    $scope = $rootScope.$new();

    ctrl = $controller('BlogPreviewCtrl')({
      $scope: $scope,
      $element: $element
    });

    console.log(ctrl);
  }));

  // describe('addResource', function () {
  //   it("adds a resource to the ResourceService's data cache", function () {
  //     expect(ctrl.blogs.all()).toEqual(1);
  //   });
  // });
});
