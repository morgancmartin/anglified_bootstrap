frontApp.factory('TemplateService', ["Restangular", function(Restangular) {

  var _templates = [];

  var all = function(){
    return Restangular.all('templates').getList().then(function(templates){
      angular.copy(templates, _templates);
      return _templates;
    });
  };

  return {
    all: all
  };
}]);
