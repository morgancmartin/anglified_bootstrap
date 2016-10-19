app.factory('userEditService', ["_", function(_) {
  var userEdit = {};

  // use stack to get ctrl-z to "pop" off last edits, keep popping until
  var _changes = [];

  userEdit.addChange = function(el){
    var $el = el.clone() || angular.element(el).clone();

    // add a clone of hte object that is being changed, able to find it by data-id
    var obj = {
      dataID: $el.attr('data-id'),
      node: $el
    };
    _changes.push(obj);
    console.log(_changes);
    return;
  };

  userEdit.undoChange = function(){
    if(_changes.length){
        var oldEle = _changes.pop();

        angular.element("[data-id='" + oldEle.node.attr('data-id') + "']").replaceWith(oldEle.node);
    }
    console.log(_changes);
    return;
  };

  return userEdit;
}]);
