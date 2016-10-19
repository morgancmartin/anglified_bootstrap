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
