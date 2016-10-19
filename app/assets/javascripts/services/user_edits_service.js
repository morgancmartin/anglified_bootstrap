app.factory('userEditService', ["_", function(_) {
  var userEdit = {};

  // use stack to get ctrl-z to "pop" off last edits, keep popping until
  var _slideChanges = [];

  userEdit.addSlideChange = function(el){
    var $el = el.clone() || angular.element(el[0]).clone();

    // add a clone of hte object that is being changed, able to find it by data-id
    var obj = {
      dataID: $el.data('id'),
      slideName: $el.data('slide')
    };
    _slideChanges.push(obj);
    return;
  };

  userEdit.undoSlideChange = function(){

    if(_slideChanges.length){
        var oldEle = _slideChanges.pop();
        var $ele = angular.element("[data-id='" + oldEle.dataID + "']");
        var axedSlide = $ele.data('slide');
        $ele.attr('data-slide', oldEle.slideName);
        return Promise.resolve({ toSlideName: oldEle.slideName, prevSlideName: axedSlide });
    }
    return;
  };

  return userEdit;
}]);
