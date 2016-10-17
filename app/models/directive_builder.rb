class DirectiveBuilder
  @@slide_num = 1

  def initialize(html_section_obj)
    @html = ""
    html_section_obj.map { |section| @html + section }
  end

  def template_directive
    "app.directive('slide', [function() {
      return {
        restrict: 'E',
        link: function(scope, el, attr, controller) {
          scope.checkLessThanTwo = function (slide) {
            var slides = $('[data-slide="' + slide + '"]');
            if (slides.length < 2) {
              slides.find('button.create-slide').first().hide();
            } else {
              slides.find('button.create-slide').first().show();
            }
          };

          scope.compareWithCurrentState = function (slide) {
            if(slide !== el.attr('data-slide')){
              el.removeClass('ng-hide-remove').show();
              el.addClass('ng-hide-add').hide();
            } else {
              el.removeClass('ng-hide-add').hide();
              el.addClass('ng-hide-remove').show();
            }

            scope.checkLessThanTwo(slide);
          };

          scope.$on('states.nextState', function(ev, slide) {
            scope.compareWithCurrentState(slide);
          });
        }
      };
    }]);"
  end

  # '<header id="main-header" show-hide="" data-slide="home" data-id="16" class="">
  #         <div class="container" data-id="17">
  #             <div class="row" data-id="18">
  #                 <div class="col-sm-7" data-id="19">
  #                     <div class="header-content" data-id="20">
  #                         <div class="header-content-inner" data-id="21">
  #                             <!-- CREATE SLIDE -->
  #
  #
  #                             <!-- CHECKBOX -->
  #
  #                             <h1 data-id="25"><a href="#" editable-text="page.h1a" class="ng-scope ng-binding editable editable-click editable-empty" data-id="26">empty</a></h1>
  #                             <a href="#download" class="btn btn-outline btn-xl page-scroll" data-id="27">Start Now for Free!</a>
  #                         </div>
  #                     </div>
  #                 </div>
  #                 <div class="col-sm-5" data-id="28">
  #                     <div class="device-container" data-id="29">
  #                         <div class="device-mockup iphone6_plus portrait white" data-id="30">
  #                             <div class="device" data-id="31">
  #                                 <div class="screen" data-id="32">
  #                                     <!-- Demo image for screen mockup, you can put an image here, some HTML, an animation, video, or anything else! -->
  #                                     <img src="img/demo-screen-1.jpg" class="img-responsive" alt="" data-id="33">
  #                                 </div>
  #                                 <div class="button" data-id="34">
  #                                     <!-- You can hook the "home button" to some JavaScript events or just remove it -->
  #                                 </div>
  #                             </div>
  #                         </div>
  #                     </div>
  #                 </div>
  #             </div>
  #         </div>
  #     </header>'
end
