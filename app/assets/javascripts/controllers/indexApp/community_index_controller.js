frontApp.controller('CommunityIndexCtrl',
  ['$scope', '$',
  function($scope, $ ) {

  $scope.selected;

  $scope.isSelection = function () {
    return $scope.selected;
  };

  console.log('you are in communityIndex controller');

  $scope.templates = {
    1 : {
      id: 1,
      url: 'https://startbootstrap.com/img/templates/creative.jpg',
      linkTo: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
    },
    2 : {
      id: 2,
      url: 'https://startbootstrap.com/img/templates/new-age.jpg',
      linkTo: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
    },
    3 : {
      id: 3,
      url: 'https://startbootstrap.com/img/templates/agency.jpg',
      linkTo: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
    },
    4 : {
      id: 4,
      url: 'https://startbootstrap.com/img/premium/vitality.jpg',
      linkTo: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
    },
    5 : {
      id: 5,
      url: 'https://startbootstrap.com/img/templates/stylish-portfolio.jpg',
      linkTo: 'https://blackrockdigital.github.io/startbootstrap-stylish-portfolio/'
    }
  };

  var textAnimate = function() {
     return $('.starting').hide().delay(700).show(1000).delay(1000);
  }

  $scope.getStarted = function() {
    $.fn.fullpage.moveSectionDown();

    $.when( textAnimate() ).done(function() {
      $.fn.fullpage.moveSlideRight();
    });
  };

  $scope.selectTemplate = function(template_id) {
    if ($scope.selected) {
      $('.template-cards').removeClass('bg-primary').removeClass('active');
      $scope.selected = undefined;
    } else {
      $('#template'+template_id).toggleClass('bg-primary active');
      $scope.selected = template_id;
    }

  };

  $scope.go = function() {
    alert("it'll buff out");
    // $state.go('template.show({id:$scope.selected})')
  }

  // same as $(document).ready. FullPageJSes the page.
  angular.element(document).ready(function () {
    $('#fullpage').fullpage({
      //Scrolling
      css3: true,
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 1000,
      scrollBar: false,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',
      loopBottom: false,
      loopTop: false,
      loopHorizontal: true,
      continuousVertical: false,
      continuousHorizontal: false,
      scrollHorizontally: false,
      interlockedSlides: false,
      resetSliders: false,
      fadingEffect: false,
      normalScrollElements: '#element1, .element2',
      scrollOverflow: false,
      scrollOverflowOptions: null,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,
      bigSectionsDestination: null,

      //Accessibility
      keyboardScrolling: true,
      animateAnchor: true,
      recordHistory: true,
    });
  });
}]);
