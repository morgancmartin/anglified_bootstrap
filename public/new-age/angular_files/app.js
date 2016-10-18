// loads angular app with selected modules
var app = angular.module('yourApp', ['restangular', "ui.router", 'fullPage.js']);

app.factory('_', ['$window', function($window){
  return $window._;
}]);

// CSRF support
app.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
}]);
