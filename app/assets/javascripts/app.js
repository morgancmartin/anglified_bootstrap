// For community page.
var frontApp = angular.module('indexApp',
  ['restangular', 'Devise', 'ngAnimate', 'ui.bootstrap']);

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
['restangular', 'Devise', 'ui.bootstrap', "ui.router", "ui.tinymce"]);

// Error logging.
// COMMENTED OUT FOR PRODUCTION
// app.run([function($rootScope){
//   $rootScope.$on("$stateChangeError", console.log.bind(console));
// }]);

app.factory('_', ['$window', function($window){
  return $window._;
}]);

app.factory('pluralize', ['$window', function($window){
  return $window.pluralize;
}]);

app.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider',
function(RestangularProvider, $stateProvider, $urlRouterProvider){

  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('slides', {
      url: '/',
      views: {
        '': {
          templateUrl: 'templates/slides/index.html',
          controller: 'PageWatchCtrl',
          controllerAs: 'pageWatch'
        }
      }
    })
    .state('slides.blog', {
      url: 'blog',
      views: {
        '@': {
          templateUrl: 'templates/choose_resource/blog_preview.html',
          controller: 'BlogPreviewCtrl',
          controllerAs: 'blog'
        }
      }
    })
    .state('slides.comments', {
      url: 'comments',
      views: {
        '@': {
          templateUrl: 'templates/choose_resource/comments_preview.html',
          controller: 'CommentsPreviewCtrl',
          controllerAs: 'comments'
        }
      }
    });
}]);
