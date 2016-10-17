app.factory('submitService', ["_", "Restangular", function(_, Restangular) {

  var submitPage = function(slideStack){
    var output = {};
    var $body = angular.element('body').clone();
    $body = _removeEditor($body);
    output = _slideSplice($body, slideStack);
    console.log(output);
    return Promise.resolve(output);
    // return Restangular.all("templates").post(output)
  };

  var _slideSplice = function($obj, collection){
    var output = {
      head: angular.element('head').html(),
      body: {
        withEdits: angular.element('body').clone().html()
      }
    };

    var $bodyWrapper = angular.element("<div full-page options=''>");

    _.each(collection, function(slide){
      var $sectionWrapper = angular.element("<div class='section'>");
      var $slides = $obj.children("[data-slide='" + slide +"']");

      $slides.each(function(index, element){
        var $element = _cleanAttrs(element);
        $element = _addAttrs($element);
        $sectionWrapper.append($element);
      });
      $bodyWrapper.append($sectionWrapper);
    });
    var newBody = _newBody($bodyWrapper);
    output.body.final = newBody;
    return output;
  };

  var _newBody = function($wrapper){
    var $body = angular.element('body')
                .clone();
    $body = _removeSectionsTools($body);
                // .remove('section')
                // .remove('side-bar')
                // .remove('header')
                // .remove('edit-sections');
    $body = _removeEditor($body);
    $body.find('nav').after($wrapper);
    return $body.html();
  };

  var _removeSectionsTools = function($obj){
    $obj.find("section").remove();
    $obj.find("header").remove();
    $obj.find("side-bar").remove();
    $obj.find("edit-sections").remove();
    $obj.contents().each(function() {
      if(this.nodeType === Node.COMMENT_NODE) {
          angular.element(this).remove();
      }
    });
    return $obj;
  };

  var _addAttrs = function($ele){
    $ele.addClass('slide');
    return $ele;
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
    $obj.find("[ng-submit='saveNodes()']").remove();
    return $obj;
  };

  return {
    submitPage: submitPage
  };
}]);
