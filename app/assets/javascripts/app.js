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
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap', "xeditable", "ui.tinymce"]
  );

app.factory('$', ['$window', function($window){
  return $window.$;
}]);

app.factory('_', ['$window', function($window){
  return $window._;
}]);

app.config(['RestangularProvider',
function(RestangularProvider){
  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
}]);
