// For community page.
var frontApp = angular.module('indexApp',
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap', "xeditable"]
  );

frontApp.factory('$', ['$window', function($window){
  return $window.$;
}]);

frontApp.config(['RestangularProvider',
function(RestangularProvider){
  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);

// CSRF support
frontApp.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
}]);


// For edit page.
var app = angular.module('editApp',
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap', "xeditable"]
  );

app.factory('$', ['$window', function($window){
  return $window.$;
}]);

app.factory('_', ['$window', function($window){
  return $window._;
}]);

app.factory('pluralize', ['$window', function($window){
  return $window.pluralize;
}]);

app.config(['RestangularProvider',
function(RestangularProvider){
  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);


// TESTING ONLY!!! DELETE AFTER
var generatorTest = angular.module('generatorTest', ['restangular', 'Devise']);

generatorTest.factory('$', ['$window', function($window){
  return $window.$;
}]);

generatorTest.factory('_', ['$window', function($window){
  return $window._;
}]);

generatorTest.factory('pluralize', ['$window', function($window){
  return $window.pluralize;
}]);

generatorTest.config(['RestangularProvider',
function(RestangularProvider){
  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);

// CSRF support
// generatorTest.config(
//   ["$httpProvider",
//   function($httpProvider) {
//     var token = $('meta[name=csrf-token]')
//       .attr('content');
//     $httpProvider
//       .defaults
//       .headers
//       .common['X-CSRF-Token'] = token;
// }]);

generatorTest.controller('GeneratorTestCtrl', ['ResourceGenerator', '$injector', function(ResourceGenerator,$injector) {

  // Delete this file and the folder it's in when finished testing.
  var vm = this;

  vm.users = $injector.instantiate(ResourceGenerator.generate('users'));

  console.log(vm.users.all());

  vm.hello = 'hello';
}]);

generatorTest.component('generator', {
  controller: 'GeneratorTestCtrl',
  restrict: 'E',
  template: "<p>{{$ctrl.users}}</p>"
});
