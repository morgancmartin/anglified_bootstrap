describe('editSections', function () {
  beforeEach(module('editApp'));

  var scope, element, directive, checkBox, $compile, $rootScope, $httpBackend, isolate;

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    scope.edit = false;

    // Set up the back end.
    $httpBackend.whenGET('templates/edit_sections/edit_sections.html').respond(200, '');

    // Stub an element.
    element = $compile("<edit-sections></edit-sections>")(scope);
    // Need to begin digest loop after compiling html.
    console.log(element.children());
    scope.$digest();

    // Stub an isolate scope.
    isolate = element.children().scope();

    // Stub a function.
    spyOn(isolate, 'toggleSectionState').and.callFake(function() {
      isolate.edit = !isolate.edit;
    });
  }));

  describe('toggleSectionState', function() {
    it('replaces the edit buttons with checkboxes', function() {
      editButton = $compile("<i ng-hide='edit'></i>");
      scope.toggleTextboxState();
      expect(editButton).toBeHidden();
    });
  });
});
