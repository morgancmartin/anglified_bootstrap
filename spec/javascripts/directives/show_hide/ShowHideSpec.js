describe('showHide', function () {
  beforeEach(module('editApp'));

  var scope, el, $rootScope, $compile, mockSlides, createSlideBtn, isolate;

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    // DOM Elements.
    el = angular.element('<div show-hide></div>');
    // create
    createSlideBtn = angular.element("<button class='create-slide'></button>");
    scope = $rootScope.$new();
    // compile
    $compile(el)(scope);
    $compile(createSlideBtn)($rootScope);
    // run digest loop
    scope.$digest();
    // get compiled element's isolate scope
    isolate = el.isolateScope();

    // Mock isolate scope bindings.
    scope.currentState = 'home';
    scope.editStates = {
      section: false,
      textbox: false,
      tinymce: false
    };

    // Mock slides in DOM.
    mockSlides = {
      'home': ['3','4'],
      '1': ['1'],
      '2': ['2']
    };

    spyOn(isolate, 'checkLessThanTwo').and.callFake(function(slide) {
      var slides = mockSlides[slide];
      if (slides.length < 2) {
        createSlideBtn[0].hidden = true;
      } else {
        createSlideBtn[0].hidden = false;
      }
    });
  }));

  describe('checkLessThanTwo', function () {
    it("should hide the 'create slide' buttons when there's less than two slides", function () {
      expect(createSlideBtn[0].hidden).toBe(false);
      isolate.checkLessThanTwo('1');
      expect(createSlideBtn[0].hidden).toBe(true);
    });
  });
});
