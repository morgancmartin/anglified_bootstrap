app.controller('PageWatchCtrl',
['$scope', '$rootScope', "_", 'submitService',
function($scope, $rootScope, _, submitService){
  var elements = angular.element('body *');

  for (var i =1; i < ( 1 + elements.length ); i++){
    angular.element(elements[i]).attr('data-id', i);
  }
  // compare element's id with currentstate; if match { show }

  $scope.page = {};

  $scope.states = ['home'];
  $scope.count = 0;

  // Clicking 'make a new slide' on a section/header/footer
  // should take it out of the main page and give it its own slide.
  $scope.createSlide = function($event){
    var slideTag = angular.element($event.currentTarget).closest('section');
    if (!slideTag.length){
      slideTag = angular.element($event.currentTarget).closest('header');
    }

    slideTag.attr('data-slide', $scope.states.length);
    // Tell checkbox to call its getDataSlide function.
    $scope.$broadcast('states.getDataSlide');
    $scope.states.push(slideTag.attr('data-slide'));
    $scope.nextState($scope.states.length);
  };

  $scope.nextState = function(jump) {
    if (jump){
      $scope.count = jump - 1;
    } else {
      $scope.count = ($scope.count + 1) % $scope.states.length;
    }
    $scope.$broadcast('states.nextState', $scope.states[$scope.count] );
  };

  // Edit states of the different parts.
  $scope.editStates = {
    section: false,
    textbox: false,
    tinymce: false

  };

  // Listener for toggle events in the sidebar.
  $rootScope.$on('sidebar.toggled', function (ev, editStates) {
    angular.copy(editStates, $scope.editStates);
  });

  // Checkbox values for sections.
  // Toggle true/false
  $scope.checkboxValues = {};
  $rootScope.$on('checkbox.value', function (ev, checkboxValue) {
    if ($scope.checkboxValues[checkboxValue]) {
      $scope.checkboxValues[checkboxValue] = !$scope.checkboxValues[checkboxValue];
    } else {
      $scope.checkboxValues[checkboxValue] = true;
    }
  });

  // Storing data to be sent to the Rails API.
  $scope.submitPage = function(){
    submitService.submitPage($scope.states).then(function(response){
      console.log(response);
      return response;
    }).catch(function(reason){
      console.log(reason);
    });
  };

  /*
  ----------------------------------------------------
  Tiny MCE
  ----------------------------------------------------
  */

  $scope.previousId;
  $scope.mce = function (event) {
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
        },
        content_css: [
          'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.1.1/css/mdb.min.css'
        ]
      });
  };

  //sets a listener to 'textable' class tags 
  // builds tinyMCE editor and hides selected tag
  $scope.$watch('editStates.tinymce', function(newVal) {    
    if (newVal) {
      angular.element('.textable').on('click', $scope.mce);
    } else {
      tinymce.remove('.textable');
      angular.element('.textable').off('click', $scope.mce);
      console.log("tinyMceListeners and Editors are gone");
    }
  });


}]);
