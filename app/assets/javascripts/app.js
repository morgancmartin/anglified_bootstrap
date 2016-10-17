var frontApp = angular.module('indexApp', 
  ['restangular', 'Devise']
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