// For community page.
var frontApp = angular.module('indexApp',
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap', "xeditable"]
  );

frontApp.factory('$', ['$window', function($window){
  return $window.$;
}]);

// For edit page.
var app = angular.module('editApp',
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap', "xeditable"]
  );

app.factory('_', ['$window', function($window){
  return $window._;
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
