import Marionette from 'backbone.marionette';
import template from './DetailsView.hbs.html';
import '../../lib/owl-carousel/owl.carousel.min.js';
var View = Marionette.View.extend({
    
    template:template,

    onAttach() {
        this.initCarousel('#postImages');
        this.initCarousel('#relatedPosts');
    },

    initCarousel(el) {

        var slider 		= this.$(el);
        var options 	= slider.attr('data-plugin-options');

        // Progress Bar
        var $opt = eval('(' + options + ')');  // convert text to json

        if($opt.progressBar == 'true') {
            var afterInit = progressBar;
        } else {
            var afterInit = false;
        }

        var defaults = {
            items: 					5,
            itemsCustom: 			false,
            itemsDesktop: 			[1199,4],
            itemsDesktopSmall: 		[980,3],
            itemsTablet: 			[768,2],
            itemsTabletSmall: 		false,
            itemsMobile: 			[479,1],
            singleItem: 			true,
            itemsScaleUp: 			false,

            slideSpeed: 			200,
            paginationSpeed: 		800,
            rewindSpeed: 			1000,

            autoPlay: 				false,
            stopOnHover: 			false,

            navigation: 			false,
            navigationText: [
                                '<i class="fa fa-angle-left"></i>',
                                '<i class="fa fa-angle-right"></i>'
            ],
            rewindNav: 				true,
            scrollPerPage: 			false,

            pagination: 			true,
            paginationNumbers: 		false,

            responsive: 			true,
            responsiveRefreshRate: 	200,
            responsiveBaseWidth: 	window,

            baseClass: 				"owl-carousel",
            theme: 					"owl-theme",

            lazyLoad: 				false,
            lazyFollow: 			true,
            lazyEffect: 			"fade",

            autoHeight: 			false,

            jsonPath: 				false,
            jsonSuccess: 			false,

            dragBeforeAnimFinish: 	true,
            mouseDrag: 				true,
            touchDrag: 				true,

            transitionStyle: 		false,

            addClassActive: 		false,

            beforeUpdate: 			false,
            afterUpdate: 			false,
            beforeInit: 			false,
            afterInit: 				afterInit,
            beforeMove: 			false,
            afterMove: 				(afterInit == false) ? false : moved,
            afterAction: 			false,
            startDragging: 			false,
            afterLazyLoad: 			false
        }

        var config = $.extend({}, defaults, options, slider.data("plugin-options"));
        slider.owlCarousel(config).addClass("owl-carousel-init");

        function progressBar(elem){
            $elem = elem;
            //build progress bar elements
            buildProgressBar();
            //start counting
            start();
        }
				 
        //create div#progressBar and div#bar then prepend to $("#owl-demo")
        function buildProgressBar(){
            $progressBar = $("<div>",{
                id:"progressBar"
            });
            $bar = $("<div>",{
                id:"bar"
            });
            $progressBar.append($bar).prependTo($elem);
        }

        function start() {
            //reset timer
            percentTime = 0;
            isPause = false;
            //run interval every 0.01 second
            tick = setInterval(interval, 10);
        };

			 
        var time = 7; // time in seconds
        function interval() {
            if(isPause === false){
                percentTime += 1 / time;
                $bar.css({
                    width: percentTime+"%"
                });
                //if percentTime is equal or greater than 100
                if(percentTime >= 100){
                    //slide to next item 
                    $elem.trigger('owl.next')
                }
            }
        }
				 
        //pause while dragging 
        function pauseOnDragging(){
            isPause = true;
        }
				 
        //moved callback
        function moved(){
            //clear interval
            clearTimeout(tick);
            //start again
            start();
        }
    },

    initRelatedCarousel() {
        
    }
});
export default View;