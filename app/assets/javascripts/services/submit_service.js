app.factory('submitService', ["_", "Restangular", function(_, Restangular) {

  var submitPage = function(slideStack){
    var output = {};
    var $body = angular.element('body').clone();
    $body = _removeEditor($body);
    output = _slideSplice($body, slideStack);
    console.log(output);
    return Restangular.all("templates").post(output);
  };

  var _slideSplice = function($obj, collection){
    var header = _addHeadScripts();
    var output = {
      // head: angular.element('head').prop('outerHTML'),
      head: header,
      body: {
        withEdits: $obj.prop('outerHTML')
      }
    };

    var $bodyWrapper = angular.element("<div full-page options=''>");

    _.each(collection, function(slide){
      var $sectionWrapper = angular.element("<div class='section'>");
      var $slides = $obj.find("[data-slide='" + slide +"']").clone();

      $slides.each(function(index, element){
        var $element = _cleanAttrs(element);
        $element = _addAttrs($element);
        $sectionWrapper.append($element);
      });
      $bodyWrapper.append($sectionWrapper);
    });
    var newBody = _newBody($bodyWrapper);
    output.body.final = newBody;
    console.log(newBody);
    return output;
  };

  var _newBody = function($wrapper){
    var $body = angular.element('body')
                .clone();
    $body = _removeSectionsTools($body);
    $body = _removeEditor($body);
    $nav = $body.find('nav');
    $nav.after($wrapper);
    $body = _addBodyScripts($body);
    return $body.html();
  };

  var _addBodyScripts = function($obj){
    $obj.append('<script src="vendor/jquery/jquery.min.js">');
    $obj.append('<script src="vendor/bootstrap/js/bootstrap.min.js">');
    $obj.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js">');
    $obj.append('<script src="js/new-age.min.js">');
    $obj.append('<script src="angular_files/app.js">');
    return $obj;
  };

  var _addHeadScripts = function() {
    var $head = angular.element('<head>');
    $head.append('<script src="angular_files/angular.min.js">');
    $head.append('<script src="angular_files/angular-ui-router.min.js">');
    $head.append('<script src="angular_files/lodash.min.js">');
    $head.append('<script src="angular_files/restangular.js">');
    $head.append('<script src="angular_files/jquery.fullPage.js">');
    return $head.html();
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
