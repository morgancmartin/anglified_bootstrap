app.controller('GeneratorTestCtrl', ['ResourceGenerator', function(ResourceGenerator) {

  // Delete this file and the folder it's in when finished testing.
  var vm = this;

  vm.users = ResourceGenerator.generate('users');

}]);
