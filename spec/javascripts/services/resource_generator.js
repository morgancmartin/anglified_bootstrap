describe('ResourceGenerator', function () {
  var users, data, generator, mockData;

  beforeEach(function() {
    module('editApp');
    inject(function($injector) {
      generator = $injector.get('ResourceGenerator');
    });
    users = generator.generate('users');
    mockData = [
      {email: 'cjvirtucio@gmail.com'},
      {email: 'foobar@barbaz.com'},
      {email: 'someone@some.com'}
    ];
    // module(function($provide) {
    //   $provide.factory('Restangular', function () {
    //     this.generate = jasmine.createSpy('generate');
    //   });
    // });
    // module('ResourceGenerator');
    //
    // var users = ResourceGenerator.generate('users');
    // console.log(users);
  });

  describe('all', function() {
    it('should return a collection of users', function () {
      data = users.all();
      expect(data.cache[0]).toEqual(mockData[0]);
    });
  });
});
