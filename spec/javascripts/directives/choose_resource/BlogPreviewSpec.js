// Modal Controller.
describe('BlogModalCtrl', function () {
  var ctrl, $rootScope, $controller, modalInstance, data;

  beforeEach(module('editApp'));

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;

    // Mock modal and data.
    modalInstance = {
      opened: true,
      dismissed: false,
      close: function () {
        var modal = this;
        modal.opened = false;
        modal.dismissed = false;
      },
      dismiss: function (type) {
        var modal = this;
        modal.opened = false;
        modal.dismissed = true;
      }
    };
    data = [];

    // Stub the controller.
    ctrl = $controller('BlogModalCtrl', {
      $uibModalInstance: modalInstance,
      data: data
    });
  }));

  describe('ok', function () {
    beforeEach(function () {
      expect(modalInstance.opened).toBe(true);
      expect(modalInstance.dismissed).toBe(false);
      ctrl.ok();
    });

    it("should close the modal", function () {
      expect(modalInstance.opened).toBe(false);
    });

    it("should not dismiss the modal", function () {
      expect(modalInstance.dismissed).toBe(false);
    });
  });

  describe('cancel', function () {
    beforeEach(function () {
      expect(modalInstance.opened).toBe(true);
      expect(modalInstance.dismissed).toBe(false);
      ctrl.cancel();
    });
    it("should close the modal", function () {
      expect(modalInstance.opened).toBe(false);
    });

    it("should dismiss the modal", function () {
      expect(modalInstance.dismissed).toBe(true);
    });
  });
});

// Directive.
describe('BlogPreview', function () {
  var ctrl, $rootScope, $scope, $element, $compile, $http;
  var mockBlogs = [
    {
      "id": 1,
      "title": "A new adventure",
      "created_at": "2012-04-23T18:25:43.511Z",
      "author": "blogger",
      "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      "id": 2,
      "title": "Another adventure",
      "created_at": "2013-07-04T19:25:43.511Z",
      "author": "blogger",
      "body": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
  ];

  beforeEach(module('editApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    // Setup dependencies.
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $http = _$httpBackend_;
    $element = angular.element("<blog-preview></blog-preview>");

    // Compile the element.
    $compile($element)($rootScope.$new());

    // Grab the scope.
    $scope = $element.isolateScope() || $element.scope();

    // Grab the directive's ctrl.
    ctrl = $scope.blog;
  }));

  describe('blogs', function () {
    it("should return all the blogs in the database", function (done) {
      function testBlogsData (data) {
        expect(data.cached.length).toEqual(2);
      }

      // Setup to respond with mock data.
      $http.whenGET('data/blogs.json').respond(200,mockBlogs);
      $http.whenGET('templates/slides/index.html').respond(200);

      // Make your ajax call.
      ctrl.blogs.all()
        .then(testBlogsData)
        .finally(done);

      // Flush pending requests (requests are async) and allow the test to execute
      // synchronously.
      $http.flush();
    });
  });
});
