app.factory('submitService',
['Restangular', "_", function(Restangular, _) {

  var submitPage = function(slideStack){
    var output = {};
    var $body = angular.element('body').clone();
    $body = _removeEditor($body);
    output = _slideSplice($body, slideStack);
    return _sendPage(output);
  };

  var _logError = function (reason) {
    console.log(reason);
    throw new Error(reason);
  };

  var _logResponse = function (response) {
    console.log(response);
  };

  // POST CREATE to Templates controller in Rails API.
  var _sendPage = function (page) {
    return Restangular.all('templates')
      .post({template: page})
      .catch(_logError)
      .then(_logResponse);
  };

  var _slideSplice = function($obj, collection){
    var output = {};
    _.each(collection, function(slide){
      var slides = $obj.find("[data-slide='" + slide +"']");
      output[slide] = {};
      slides.each(function(index, element){
        var $element = _cleanAttrs(element);
        output[slide][index] =  $element.prop('outerHTML');
      });
    });
    return output;
  };

  var _cleanAttrs = function(ele){
    var $ele = angular.element(ele)
      .removeAttr('current-state ng-animate')
      .removeClass('ng-isolate-scope');
    return $ele;
  };

  var _removeEditor = function($obj){
    $obj.find('.create-slide').remove();
    $obj.find('.next-state-btn').remove();
    $obj.find('to-checkbox').remove();
    $obj.find('[ng-click="getNodes()"]').remove();
    return $obj;
  };

  return {
    submitPage: submitPage
  };
}]);
