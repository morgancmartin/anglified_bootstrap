// Modal Ctrl.
describe('CommentModalCtrl', function () {
  var ctrl, $rootScope, $controller, modalInstance, data;

  beforeEach(module('editApp'));

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;

    
  }));
});

// CommentPreview directive.
describe('CommentPreview', function () {
  var ctrl, $rootScope, $scope, $element, $compile, $http;

  var mockComments = [
    {
      "id": 1,
      "created_at": "2012-04-23T18:25:43.511Z",
      "author": "reader",
      "body": "awesome!"
    },
    {
      "id": 2,
      "created_at": "2013-07-04T19:25:43.511Z",
      "author": "reader",
      "body": "nice!"
    }
  ];

  beforeEach(module('editApp'));

  beforeEach(inject(function(_$compile_,_$rootScope_,_$httpBackend_) {
    // Setup dependencies.
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $http = _$httpBackend_;
    $element = angular.element("<comment-preview></comment-preview>");

    // Compile the element.
    $compile($element)($rootScope.$new());

    // Grab the scope.
    $scope = $element.isolateScope() || $element.scope();

    // Grab the directive's ctrl.
    ctrl = $scope.comment;
  }));

  describe('comments', function () {
    it("should return all the comments in the database", function (done) {
      function testCommentsData (data) {
        expect(data.cached.length).toEqual(2);
      }

      // Setup responses for ajax call (comments.all() is an ajax call).
      $http.whenGET('data/comments.json').respond(200, mockComments);
      $http.whenGET('templates/slides/index.html').respond(200, mockComments);

      // Make your call.
      ctrl.comments.all()
        .then(testCommentsData)
        .finally(done);

      // Flush pending requests to let the test runner execute synchronously.
      $http.flush();
    });
  });
});
