app.factory('tinyMCEService',
['_', 'userEditService', '$timeout',
function( _, userEditService, $timeout) {

  var stub = {};

  var _previousNode;
  var _previousId;

  stub.getPreviousNode = function() {
    return _previousNode;
  };

  stub.setPreviousNode = function(node) {
    _previousNode = node;
  };

  stub.clearEditors = function () {
    tinymce.remove('.textable');
  };

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
    // change the element targetted on the dom
    var change = nested_targ || event.target;
    change = angular.element(change).clone();
    stub.setPreviousNode(change);

    // utilizes different set of tinyMCEs depending on type of node/Domelement
    stub.whichMCE(change.get(0).tagName, id);
    // t
  };

  stub.whichMCE = function(tagType, id) {
    switch(tagType) {
      case 'A':
        stub.miniMCE(id);
        break;
      case 'IMG':
        console.log('hi image not rdy 4 u yet');
        break;
    default:
        stub.defaultMCE(id);
        break;
    }
  };

  stub.miniMCE = function(id) {
    tinymce.init({
      selector: ('#' + id),
      
      theme: "inlite",
      inline: true,
      paste_data_images: true,
      plugins: 'image link paste contextmenu textpattern autolink',
      insert_toolbar: 'quickimage',
      selection_toolbar: 'bold italic | quicklink',
    });
  };

  stub.defaultMCE = function(id) {
    tinymce.init({
      selector: ('#' + id),
      plugins: 'link image code wordcount',
      toolbar: 'myimage | close | undo redo | bold italic | alignleft aligncenter alignright | code',
      menubar: false,
      setup: function (editor) {
        // editor.addButton('mybutton', {
        //   text: 'ClickMe',
        //   icon: false,
        //   onclick: function () {
        //     editor.insertContent('<button class="btn btn-info">DoNothing</button>');
        //   }
        // });
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
