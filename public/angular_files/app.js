// loads angular app with selected modules
var yourApp = angular.module('yourApp', ['restangular', "ui.router", 'fullPage.js']);

yourApp.factory('_', ['$window', function($window){
  return $window._;
}]);

// CSRF support
yourApp.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
}]);
