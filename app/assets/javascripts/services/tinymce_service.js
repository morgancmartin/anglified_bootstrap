app.factory('tinyMCEService',
['_', 'userEditService', '$timeout',
function( _, userEditService, $timeout) {

  var stub = {};

  var _previousNode;

  stub.getPreviousNode = function() {
    return _previousNode;
  };

  stub.setPreviousNode = function(node) {
    _previousNode = node;
  };

  stub.clearEditors = function () {
    tinymce.remove('.textable');
  };

  var _previousId;

  stub.callMCE = function(event) {
    stub.clearEditors();
    var nested_targ;
    var id;
    // handle edge cases to select textable
    if(_previousId) {
      nested_targ = event.target;
      while (!nested_targ.class && (nested_targ.class !== "textable" )) {
        if (nested_targ.id) {
          id = nested_targ.id;
          break;
        }
        nested_targ = angular.element(nested_targ).parent()[0];
      }
    } else {
      id = event.target.id;
      _previousId = id;
    }

    var change = nested_targ || event.target;
    change = angular.element(change).clone();
    stub.setPreviousNode(change);

    stub.initMCE(id);
  };

  stub.initMCE = function(id) {
    tinymce.init({
      selector: ('#' + id),
      plugins: 'link image code wordcount',
      toolbar: 'mybutton | myimage | close | undo redo | bold italic | alignleft aligncenter alignright | code',
      theme: "inlite",
      inline: true,
      menubar: true,
      setup: function (editor) {
        editor.addButton('mybutton', {
          text: 'ClickMe',
          icon: false,
          onclick: function () {
            editor.insertContent('<button class="btn btn-info">DoNothing</button>');
          }
        });

        editor.addButton('close', {
          text: 'Exit',
          icon: false,
          onclick: function() {
            editor.destroy();
          }
        });
        editor.addButton('myimage', {
          text: 'Image',
          icon: false,
          onclick: function() {
            editor.insertContent('<img style="height: 50px" src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"></img>');
          }
        });
      }
    });
  };


  return stub;
}]);
