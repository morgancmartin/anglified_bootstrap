app.factory('userEditService', ["_", function(_) {
  var userEdit = {};

  // use stack to get ctrl-z to "pop" off last edits, keep popping until
  var _slideChanges = [];

  userEdit.addSlideChange = function(el){
    var $el = el.clone() || angular.element(el[0]).clone();

    // add a clone of hte object that is being changed, able to find it by data-id
    var obj = {
      dataID: $el.data('id'),
      node: $el
    };
    _slideChanges.push(obj);
    return;
  };

  userEdit.undoSlideChange = function(){

    if(_slideChanges.length){
        var oldEle = _slideChanges.pop();
        angular.element("[data-id='" + oldEle.node.attr('data-id') + "']").replaceWith(oldEle.node);
        return Promise.resolve(oldEle.node.data('slide'));
    }
    return;
  };

  return userEdit;
}]);
