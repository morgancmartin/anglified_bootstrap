var app = angular.module('app', 
  ['ui.router', 'restangular', 'Devise', 'angularModalService', 'xeditable', 'lodash']
  );

angular.module('lodash', []).factory('_', ['$window', function($window) {
  return $window._;
}]);

/*
This will be useful for editable options later. configure it later as well.
------------------------------------------------------------------------------------------------
app.run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes) {
  editableOptions.theme = 'default';
   editableThemes['default'].submitTpl = '<button type="submit" class="btn btn-md btn-outline-primary"> Submit</button>';
   editableThemes['default'].cancelTpl = '<button type="submit" class="btn btn-md btn-outline-danger "> Cancel</button>';
}]);
*/

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

app.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
function($stateProvider, $urlRouterProvider, RestangularProvider){

  // Restangular
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');

  // $urlRouterProvider.otherwise('/main');
  // $stateProvider
  //   .state('main', {
  //     url: '',
  //     views: {
  //       '@': {
  //         templateUrl: '/templates/main-view.html',
  //         controller: 'MainCtrl'
  //       }
  //     }
  //   });
}]);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);
