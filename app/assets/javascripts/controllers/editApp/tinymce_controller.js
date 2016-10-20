app.controller('TinyMceCtrl',
  ['$scope', function($scope) {

  $scope.previousId;

  //sets a listener to 'textable' class tags
  angular.element('.textable').on('click', function(event) {
    /*edge cases are:
      clicking a box, exiting, and reclicking it should still target the same div.
      clicking another box should successfully target the other box.
    */
    var id;
    if($scope.previousId) {
      var nested_targ = event.target;
      while (!nested_targ.class && (nested_targ.class !== "textable" )) {
        if (nested_targ.id) {
          id = nested_targ.id;
          break;
        }
        nested_targ = angular.element(nested_targ).parent()[0];
      }
    } else {
      id = event.target.id;
      $scope.previousId = id;
    }

    tinymce.init({
      selector: ('#' + id),
      plugins: 'link image code wordcount',
      toolbar: 'mybutton | myimage | close | undo redo | bold italic | alignleft aligncenter alignright | code',
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
      },
      content_css: [
        'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/css/mdb.min.css'
      ]
    });
  });
}]);
